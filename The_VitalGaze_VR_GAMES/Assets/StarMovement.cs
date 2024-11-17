using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StarMovement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    private List<Vector3> starPoints;
    private int currentTargetIndex = 0;
    private float speed = 8f;

    private LineRenderer lineRenderer;

    void Start()
    {
        // Instantiate the moving target if it's null
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }

        // Create the list of star points
        starPoints = new List<Vector3>();
        CreateStarPath();

        // Set the initial position of the target
        if (starPoints.Count > 0 && movingTarget != null)
        {
            movingTarget.transform.position = starPoints[0];
        }

        // Set up the LineRenderer to draw the path
        lineRenderer = gameObject.AddComponent<LineRenderer>();
        lineRenderer.startWidth = 0.2f;
        lineRenderer.endWidth = 0.2f;
        lineRenderer.positionCount = starPoints.Count + 1; // To close the pentagram
        lineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        lineRenderer.loop = true; // Ensure the path is closed

        // Draw the pentagram path using LineRenderer
        for (int i = 0; i < starPoints.Count; i++)
        {
            lineRenderer.SetPosition(i, starPoints[i]);
        }
        // Set the last position to close the path back to the first point
        lineRenderer.SetPosition(starPoints.Count, starPoints[0]);
    }

    void Update()
    {
        if (starPoints.Count > 0 && movingTarget != null)
        {
            // Move the target along the star points
            Vector3 targetPosition = starPoints[currentTargetIndex];
            movingTarget.transform.position = Vector3.MoveTowards(movingTarget.transform.position, targetPosition, speed * Time.deltaTime);

            // Check if the target reached the current target point
            if (Vector3.Distance(movingTarget.transform.position, targetPosition) < 0.1f)
            {
                currentTargetIndex++;
                if (currentTargetIndex >= starPoints.Count)
                {
                    currentTargetIndex = 0;
                }
            }
        }
    }

    void CreateStarPath()
    {
        float radius = 10f;
        Vector3 center = Vector3.zero;

        // Calculate the positions for the pentagram (5 points)
        for (int i = 0; i < 5; i++)
        {
            // Use polar coordinates to get the positions of the star points
            float angle = Mathf.PI / 2f + i * 4f * Mathf.PI / 5f; // Skip every other point for a pentagram
            Vector3 point = new Vector3(
                center.x + radius * Mathf.Cos(angle),
                0f,
                center.z + radius * Mathf.Sin(angle)
            );
            starPoints.Add(point);
        }
    }
}
