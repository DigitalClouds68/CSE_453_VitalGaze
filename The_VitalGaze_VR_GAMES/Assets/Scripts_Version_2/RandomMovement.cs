using UnityEngine;

public class RandomMovement : MovementBase
{
    public Vector3 targetDirection;
    public float speed = 5f;
    public float changeDirectionInterval = 2f;
    public float boundaryLimit = 10f;

    private float changeDirectionTimer = 0f;

    void Update()
    {
        UpdateMovement();
    }

    public override void UpdateMovement()
    {
        if (movingTarget != null)
        {
            movingTarget.transform.Translate(targetDirection * speed * Time.deltaTime);

            changeDirectionTimer += Time.deltaTime;
            if (changeDirectionTimer >= changeDirectionInterval || IsOutOfBounds())
            {
                SetRandomDirection();
                changeDirectionTimer = 0f;
            }
        }
    }

    private void SetRandomDirection()
    {
        float randomX = Random.Range(-1f, 1f);
        float randomZ = Random.Range(-1f, 1f);
        targetDirection = new Vector3(randomX, 0f, randomZ).normalized;
    }

    private bool IsOutOfBounds()
    {
        return Mathf.Abs(movingTarget.transform.position.x) > boundaryLimit ||
               Mathf.Abs(movingTarget.transform.position.z) > boundaryLimit;
    }
}
