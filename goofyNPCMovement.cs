using UnityEngine;
using System.Collections;

[RequireComponent(typeof(CharacterController))]
public class GoofyNPCMovement : MonoBehaviour
{
    public float speed = 3.0f;
    public float rotationInterval = 3.0f;

    public Animator animator;
    

    private CharacterController controller;
    private float nextRotationTime;
    private Vector3 targetDirection;
    public float gravity = -6.81f;
    Vector3 velocity;


    void Start()
    {
        controller = GetComponent<CharacterController>();
        animator = GetComponent<Animator>(); // Add this line to get the Animator component
        nextRotationTime = Time.time + rotationInterval;
    }

    void Update()
    {

        if (controller.velocity == Vector3.zero)
        {
            animator.SetFloat("speedZ", 0);
        }
        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity);
        animator.SetFloat("speedZ", 1);
        if (Time.time >= nextRotationTime)
        {
            // Generate a random direction: 0 = forward, 1 = right, 2 = back, 3 = left
            int randomIndex = Random.Range(0, 4);
            switch (randomIndex)
            {
                case 0:
                    targetDirection = Vector3.forward;
                    animator.SetFloat("posY", 1);
                    animator.SetFloat("posX", 0);
                    animator.SetFloat("speedZ", 1);
                    break;
                case 1:
                    targetDirection = Vector3.right;
                    animator.SetFloat("posX", 1);
                    animator.SetFloat("posY", 0);
                    animator.SetFloat("speedZ", 1);
                    break;
                case 2:
                    targetDirection = Vector3.back;
                    animator.SetFloat("posY", -1);
                    animator.SetFloat("posX", 0);
                    animator.SetFloat("speedZ", 1);
                    break;
                case 3:
                    targetDirection = Vector3.left;
                    animator.SetFloat("posX", -1);
                    animator.SetFloat("posY", 0);
                    animator.SetFloat("speedZ", 1);
                    break;
            }

            // Update the next rotation time
            nextRotationTime = Time.time + rotationInterval;
        }

        // Move the character forward
        controller.Move(targetDirection * speed * Time.deltaTime);
    }

   



}