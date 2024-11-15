using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MW_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    private float speed = 2f;
    private float frequency = 1f;
    private float amplitude = 10f; 
    private float pathLength = 20f; 
    private float direction = 1f;

    void Start()
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }
    }

    void Update()
    {
        if (movingTarget != null)
        {
            float x = movingTarget.transform.position.x + direction * speed * Time.deltaTime;

            if (x > pathLength || x < -pathLength)
            {
                direction *= -1;
            }

            float z = Mathf.Sin(x * frequency) * amplitude;

            movingTarget.transform.position = new Vector3(x, 0f, z);
        }
    }
}
