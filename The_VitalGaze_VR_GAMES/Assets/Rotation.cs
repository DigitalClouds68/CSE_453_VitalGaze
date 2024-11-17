using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation : MonoBehaviour
{
    public GameObject rotatingTarget;

    private float rotationSpeed = 1.5f;
    private GameObject currentTarget;
    private float radius = 10f;

    void Start()
    {
        if (currentTarget == null) {
        SpawnRotatingTarget();
        }
    }

    void Update()
    {
        // circular path
        if (currentTarget != null)
        {
            float angle = Time.time * rotationSpeed;
            Vector3 newPosition = new Vector3(Mathf.Cos(angle) * radius, 0f, Mathf.Sin(angle) * radius);
            currentTarget.transform.position = newPosition;
        }
    }

    void SpawnRotatingTarget()
    {
        // Instantiate
        Vector3 startPosition = new Vector3(radius, 0f, 0f);
        currentTarget = Instantiate(rotatingTarget, startPosition, Quaternion.identity);

        // Size of the sphere
        //use to initialize a ball we do not need it
        //currentTarget.transform.localScale = new Vector3(2f, 2f, 2f);
    }
}
