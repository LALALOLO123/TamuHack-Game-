using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class endSceneTrigger : MonoBehaviour
{
    private int life1 = 3;
    private int life2 = 3;
   
    public string ending1 = "ending1";
    public string ending2 = "ending2";
    public DialogueManager d;

    public void addLife1()
    {
        life1++;
        Debug.Log("this is life1: " + life1);
    }


    public void subLife1()
    {
        life1--;
        Debug.Log("this is life1: " + life1);

    }

    public void addLife2() 
    {
        life2++;
        Debug.Log("this is life1: " + life2);

    }

    public void subLife2()
    {
        life2--;
        Debug.Log("this is life1: " + life2);
    }


    
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {

            if (!(life1 == life2))
            {
                if (life1 > life2)
                {
                    SceneManager.LoadScene(ending1);
                    Cursor.lockState = CursorLockMode.None;
                    Cursor.visible = true;


                }
                else
                {
                    SceneManager.LoadScene(ending2);
                    Cursor.lockState = CursorLockMode.None;
                    Cursor.visible = true;


                }

            }
        
        }



    }

}
