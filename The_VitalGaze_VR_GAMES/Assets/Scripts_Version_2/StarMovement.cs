using System.Collections.Generic;
using UnityEngine;

public class StarMovement : MovementBase
{
    public List<Vector3> starPoints;
    public int currentTargetIndex = 0;
    public float speed = 8f;

    void Start()
    {
        CreateStarPath();
    }

    void Update()
    {
        UpdateMovement();
    }

    public override void UpdateMovement()
    {
        if (starPoints.Count > 0 && movingTarget != null)
        {
            Vector3 targetPosition = starPoints[currentTargetIndex];
            movingTarget.transform.position = Vector3.MoveTowards(movingTarget.transform.position, targetPosition, speed * Time.deltaTime);

            if (Vector3.Distance(movingTarget.transform.position, targetPosition) < 0.1f)
            {
                currentTargetIndex = (currentTargetIndex + 1) % starPoints.Count;
            }
        }
    }

    private void CreateStarPath()
    {
        float radius = 10f;
        starPoints = new List<Vector3>();
        for (int i = 0; i < 5; i++)
        {
            float angle = Mathf.PI / 2f + i * 4f * Mathf.PI / 5f;
            Vector3 point = new Vector3(
                Mathf.Cos(angle) * radius,
                0f,
                Mathf.Sin(angle) * radius
            );
            starPoints.Add(point);
        }
    }
}
