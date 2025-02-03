using UnityEngine;

public class MWMovement : MovementBase
{
    public float speed = 10f;
    public float frequency = 1f;
    public float amplitude = 10f;
    public float pathLength = 20f;
    public float direction = 1f;

    void Update()
    {
        UpdateMovement();
    }

    public override void UpdateMovement()
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
