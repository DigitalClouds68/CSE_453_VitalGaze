/*
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Movement : MonoBehaviour
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
*/
/*
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    public Vector3 centerPosition = Vector3.zero;
    public float radius = 5f;
    public float rotationSpeed = 50f;

    void Start()
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, new Vector3(centerPosition.x + radius, centerPosition.y, centerPosition.z), Quaternion.identity);
        }
    }

    void Update()
    {
        if (movingTarget != null)
        {
            float angle = rotationSpeed * Time.time * Mathf.Deg2Rad;
            float x = centerPosition.x + Mathf.Cos(angle) * radius;
            float z = centerPosition.z + Mathf.Sin(angle) * radius;
            movingTarget.transform.position = new Vector3(x, centerPosition.y, z);
        }
    }
}
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotation_Movement : MonoBehaviour {
    public GameObject movingTargetPrefab;
    public GameObject movingTarget;
    public Vector3 centerPosition = Vector3.zero;
    public float radius = 5f;
    public float rotationSpeed = 50f;

    // Method to spawn the rotating target
    public void SpawnTarget() {
        if (movingTarget == null && movingTargetPrefab != null) {
            movingTarget = Instantiate(movingTargetPrefab, new Vector3(centerPosition.x + radius, centerPosition.y, centerPosition.z), Quaternion.identity);
        }
    }

    // Method to destroy the rotating target
    public void DestroyTarget() {
        if (movingTarget != null) {
            Destroy(movingTarget);
        }
    }

    void Update() {
        if (movingTarget != null) {
            // Calculate the new position for circular movement
            float angle = rotationSpeed * Time.time * Mathf.Deg2Rad;
            float x = centerPosition.x + Mathf.Cos(angle) * radius;
            float z = centerPosition.z + Mathf.Sin(angle) * radius;
            movingTarget.transform.position = new Vector3(x, centerPosition.y, z);
        }
    }
}
