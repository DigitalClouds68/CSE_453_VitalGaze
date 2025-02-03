using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public abstract class MovementBase : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    protected GameObject movingTarget;

    public virtual void SpawnTarget(Color color, float size)
    {
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);

            Renderer renderer = movingTarget.GetComponent<Renderer>();
            if (renderer != null)
            {
                renderer.material.color = color;
            }

            movingTarget.transform.localScale = new Vector3(size, size, size);
        }
    }

    public virtual void DestroyTarget()
    {
        if (movingTarget != null)
        {
            Destroy(movingTarget);
        }
    }

    public abstract void UpdateMovement();
}