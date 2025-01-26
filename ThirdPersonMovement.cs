using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ThirdPersonMovement : MonoBehaviour
{
    // Start is called before the first frame update
    public CharacterController controller;
    public Animator animator;
    public float speed = 6f;
    public float gravity = -6.81f;
    Vector3 velocity;

    [Header("Footstep")]
    public GameObject footstep;
    public float SpeedF = 0;
    public int iswalking = 0;
    void Start()
    {
        footstep.SetActive(false);
        animator = GetComponent<Animator>();
    }





    // Update is called once per frame
    void Update()
    {
      

        if ((Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s") || Input.GetKey("d")) && iswalking > 0)
        {
            footsteps();
        }
        else
        {
            StopFootsteps();
        }






        float Horizontal = -(Input.GetAxisRaw("Horizontal"));
        if (Horizontal > 0) 
        {
            animator.SetFloat("HorizontalS", -1);
        }
        else if (Horizontal == 0)
        {
            animator.SetFloat("HorizontalS", 0);
        }
        else if (Horizontal < 0)
        {
            animator.SetFloat("HorizontalS", 1);
        }
        float Vertical = -(Input.GetAxisRaw("Vertical"));
        if (Vertical > 0)
        {
            animator.SetFloat("VerticalS", 1);
        }
        else if (Vertical == 0)
        {
            animator.SetFloat("VerticalS", 0);
        }
        else if (Vertical < 0)
        {
            animator.SetFloat("VerticalS", -1);
        }

        Vector3 direction = new Vector3(Horizontal, 0f, Vertical).normalized;

        if (direction.magnitude >= 0.1f)
        {
            controller.Move(direction * speed * Time.deltaTime);
            velocity.y += gravity * Time.deltaTime;
            animator.SetFloat("SpeedS", 1);
            controller.Move(velocity);
            iswalking = 1; 
        }
        else
        {
            animator.SetFloat("SpeedS", 0);
            iswalking = 0;
        }

        





       void footsteps()
        {
            footstep.SetActive(true);
        }




       void StopFootsteps()
        {
            footstep.SetActive(false);
        }




    }
    public void StopFootstepSounds() 
    {
        footstep.SetActive(false); ;
    
    }


}
