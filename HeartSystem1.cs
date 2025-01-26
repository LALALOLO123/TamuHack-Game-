using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HeartSystem : MonoBehaviour
{

    private int life = 3;
    public int MaxLife = 5;
    public int MinLife = 0;
    public GameObject[] hearts;

    void Update()
    {
        for (int i = 0; i < hearts.Length; i++)
        {
            hearts[i].SetActive(i < life);
        }
    }

    public int getLife()
    {
        return life;
    }

    public void setLife(int newLife)
    {
        life = newLife;
    }

    public void takeDamage()
    {
        if (life > MinLife)
        {
            life--;
            hearts[life].SetActive(false);
        }
    }

    public void addLife()
    {
        if (life<MaxLife)
        {
            hearts[life].SetActive(true);
            life++;
        }
    }

}




    
