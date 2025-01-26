using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using TMPro;

public class DialogueManager : MonoBehaviour
{
    [SerializeField] private GameObject dialogueParent;
    [SerializeField] private TMP_Text dialogueText;
    [SerializeField] private Button option1Button;
    [SerializeField] private Button option2Button;
    [SerializeField] private float typingSpeed = 0.05f;
    [SerializeField] private AudioSource audioSource;
    public HeartSystem heartSystem;
   
    [SerializeField] public Animator animator;


    private List<dialogueString> dialogueList;
   

    [Header("Player")]
    [SerializeField] private ThirdPersonMovement firstPersonController;
    
    private Transform playerCamera;

    private int currentDialogueIndex = 0;


    




    private void Start()
    { 
        dialogueParent.SetActive(false);
        playerCamera = Camera.main.transform;
        heartSystem.setLife(0);

        option1Button.GetComponentInChildren<TMP_Text>().fontSize = 10;
        option2Button.GetComponentInChildren<TMP_Text>().fontSize = 10;



    }

    public void DialogueStart(List<dialogueString> textToPrint, Transform NPC)
    {
        dialogueParent.SetActive(true);
        firstPersonController.StopFootstepSounds();
        heartSystem.setLife(3);

        firstPersonController.enabled = false;
       
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
        animator.SetFloat("SpeedS", 0);


        dialogueList = textToPrint;
        currentDialogueIndex = 0;

        DisableButtons();

        StartCoroutine(PrintDialogue());
    }

    private void DisableButtons()
    {
        option1Button.interactable = false;
        option2Button.interactable = false;

        option1Button.GetComponentInChildren<TMP_Text>().text = "No Option";
        option2Button.GetComponentInChildren<TMP_Text>().text = "No Option";
    }


    private bool optionSelected = false;

    private IEnumerator PrintDialogue()
    {
        while (currentDialogueIndex < dialogueList.Count) 
        {
            dialogueString line = dialogueList[currentDialogueIndex];
            line.startDialogueEvent?.Invoke();
            Debug.Log("currentDialogueIndex: " + currentDialogueIndex);

            if (line.isQuestion)
            {
                yield return StartCoroutine(TypeTextWithVoiceover(line.text, line.voiceOverClip));
                option1Button.interactable = true;
                option2Button.interactable = true;

                option1Button.GetComponentInChildren<TMP_Text>().text = line.answerOption1;
                option2Button.GetComponentInChildren<TMP_Text>().text = line.answerOption2;


                option1Button.onClick.AddListener(() => HandleOptionSelected(line.option1IndexJump));
                option2Button.onClick.AddListener(() => HandleOptionSelected(line.option2IndexJump));

                yield return new WaitUntil(() => optionSelected);
            }
            else
            {
                yield return StartCoroutine(TypeTextWithVoiceover(line.text, line.voiceOverClip));


            }

            line.endDialogueEvent?.Invoke();

            optionSelected = false;
        }
        


        DialogueStop();
    
    }



    private void HandleOptionSelected(int indexJump)
    {
        optionSelected = true;
        DisableButtons();
        currentDialogueIndex = indexJump;
        Debug.Log("indexJump: " + indexJump);
    }

    private IEnumerator TypeTextWithVoiceover(string text, AudioClip voiceover)
    {
        dialogueText.text = "";

        // Play the voiceover audio clip
        audioSource.PlayOneShot(voiceover);

        foreach (char letter in text.ToCharArray())
        {
            dialogueText.text += letter;
            yield return new WaitForSeconds(typingSpeed);
        }

        // Wait until both the voiceover audio clip and the text typing have finished
        yield return new WaitUntil(() => !audioSource.isPlaying);

        if (!dialogueList[currentDialogueIndex].isQuestion)
        {
            yield return new WaitUntil(() => Input.GetMouseButtonDown(0));
        }

        if (dialogueList[currentDialogueIndex].isEnd)
        {
            

            DialogueStop();
        }
        currentDialogueIndex++;
    }

    private void DialogueStop()
    {
        StopAllCoroutines();
        dialogueText.text = "";
        dialogueParent.SetActive(false);

        firstPersonController.enabled = true;

       
        heartSystem.setLife(0);

        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }





}
