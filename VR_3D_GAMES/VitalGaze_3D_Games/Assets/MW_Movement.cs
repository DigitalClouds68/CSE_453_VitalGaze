using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MW_Movement : MonoBehaviour
{
    public GameObject movingTargetPrefab;
    private GameObject movingTarget;
    private float speed = 2f;
    private float frequency = 1f;
    private float amplitude = 10f; 
    private float pathLength = 20f; 
    private float direction = 1f;

    void Start()
    {
        // 如果未手动指定移动目标，则创建一个新的目标球体
        if (movingTarget == null && movingTargetPrefab != null)
        {
            movingTarget = Instantiate(movingTargetPrefab, Vector3.zero, Quaternion.identity);
        }
    }

    void Update()
    {
        if (movingTarget != null)
        {
            // 更新球体的 X 轴位置
            float x = movingTarget.transform.position.x + direction * speed * Time.deltaTime;

            // 如果球体达到路径的末端，改变运动方向
            if (x > pathLength || x < -pathLength)
            {
                direction *= -1;
            }

            // 计算 Z 轴位置（沿着 sin 曲线上下运动）
            float z = Mathf.Sin(x * frequency) * amplitude;

            // 更新球体的位置
            movingTarget.transform.position = new Vector3(x, 0f, z);
        }
    }
}
