using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using TMPro;
using UnityEngine.UI;


public class DialogueTrigger : MonoBehaviour
{
    [SerializeField] private List<dialogueString> dialogueStrings = new List<dialogueString>();
    [SerializeField] private Transform NPCTransform;

    private bool hasSpoken = false;

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player") && !hasSpoken)
        {
            other.gameObject.GetComponent<DialogueManager>().DialogueStart(dialogueStrings, NPCTransform);
            hasSpoken = true;
        }
            
    
    }





}
[System.Serializable]
public class dialogueString
{
    public string text; // NPC text
    public bool isEnd;

    [Header("Branch")]
    public bool isQuestion;
    public string answerOption1;
    public string answerOption2;
    public int option1IndexJump;
    public int option2IndexJump;

    [Header("Triggered Events")]
    public UnityEvent startDialogueEvent;
    public UnityEvent endDialogueEvent;

    [Header("Voiceover")]
    public AudioClip voiceOverClip;






}













