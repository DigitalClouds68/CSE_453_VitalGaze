using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RandomMovement : MonoBehaviour
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
