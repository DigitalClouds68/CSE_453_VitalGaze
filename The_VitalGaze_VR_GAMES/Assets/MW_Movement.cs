/*
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MW_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    public float speed = 2f;
    public float frequency = 1f;
    public float amplitude = 10f; 
    public float pathLength = 20f; 
    public float direction = 1f;

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
                direction *= -1; // direction = direction * 1
            }

           float z = Mathf.Sin(x * frequency) * amplitude;

            movingTarget.transform.position = new Vector3(x, 0f, z);
        }
    }
}
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MW_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    public float speed = 10f;
    public float frequency = 1f;
    public float amplitude = 10f;
    public float pathLength = 20f;
    public float direction = 1f;

    public void SpawnTarget()
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }
    }

    public void DestroyTarget()
    {
        if (movingTarget != null)
        {
            Destroy(movingTarget);
        }
    }

    void Update()
    {
        if (movingTarget != null)
        {
            float x = movingTarget.transform.position.x + direction * speed * Time.deltaTime;

            if (x > pathLength || x < -pathLength)
            {
                direction *= -1; // direction = direction * 1
            }

           float z = Mathf.Sin(x * frequency) * amplitude;

            movingTarget.transform.position = new Vector3(x, 0f, z);
        }
    }

    /*
    void Update()
    {
        if (movingTarget != null)
        {
            float x = Time.time * speed * direction;
            float z = Mathf.Sin(x * frequency) * amplitude;
            movingTarget.transform.position = new Vector3(x, 0f, z);

            if (x > pathLength)
            {
                movingTarget.transform.position = new Vector3(-pathLength, 0f, Mathf.Sin(-pathLength * frequency) * amplitude);
            }
        }
    }
    */
}
