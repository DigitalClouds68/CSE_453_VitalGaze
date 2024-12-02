/*
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Random_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;

    private Vector3 targetDirection;
    private float speed = 5f;
    private float changeDirectionInterval = 2f;
    private float boundaryLimit = 10f;

    private float changeDirectionTimer = 0f;

    void Start()
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }

        SetRandomDirection();
    }

    void Update()
    {
        if (movingTarget != null)
        {
            movingTarget.transform.Translate(targetDirection * speed * Time.deltaTime);

            changeDirectionTimer += Time.deltaTime;
            if (changeDirectionTimer >= changeDirectionInterval)
            {
                SetRandomDirection();
                changeDirectionTimer = 0f;
            }

            if (Mathf.Abs(movingTarget.transform.position.x) > boundaryLimit || Mathf.Abs(movingTarget.transform.position.z) > boundaryLimit)
            {
                SetRandomDirection();
            }
        }
    }

    void SetRandomDirection()
    {
        float randomX = Random.Range(-1f, 1f);
        float randomZ = Random.Range(-1f, 1f);
        targetDirection = new Vector3(randomX, 0f, randomZ).normalized; 
    }
}
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Random_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;

    private Vector3 targetDirection;
    private float speed = 5f;
    private float changeDirectionInterval = 2f;
    private float boundaryLimit = 10f;

    private float changeDirectionTimer = 0f;

    // Method to spawn the target
    public void SpawnTarget()
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }

        SetRandomDirection();
        changeDirectionTimer = 0f;
    }

    // Method to destroy the target
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
            // Move the target in the current random direction
            movingTarget.transform.Translate(targetDirection * speed * Time.deltaTime);

            // Change direction periodically
            changeDirectionTimer += Time.deltaTime;
            if (changeDirectionTimer >= changeDirectionInterval)
            {
                SetRandomDirection();
                changeDirectionTimer = 0f;
            }

            // Check if the target has moved beyond the boundaries and reset direction if needed
            if (Mathf.Abs(movingTarget.transform.position.x) > boundaryLimit || Mathf.Abs(movingTarget.transform.position.z) > boundaryLimit)
            {
                SetRandomDirection();
            }
        }
    }

    // Set a new random direction for movement
    void SetRandomDirection()
    {
        float randomX = Random.Range(-1f, 1f);
        float randomZ = Random.Range(-1f, 1f);
        targetDirection = new Vector3(randomX, 0f, randomZ).normalized;
    }
}
