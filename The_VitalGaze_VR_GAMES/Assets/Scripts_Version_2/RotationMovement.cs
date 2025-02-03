using UnityEngine;

public class RotationMovement : MovementBase
{
    public Vector3 centerPosition = Vector3.zero;
    public float radius = 5f;
    public float rotationSpeed = 50f;

    void Update()
    {
        UpdateMovement();
    }

    public override void UpdateMovement()
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
