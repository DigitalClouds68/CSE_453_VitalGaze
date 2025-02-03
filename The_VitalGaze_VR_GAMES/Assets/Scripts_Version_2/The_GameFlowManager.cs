using UnityEngine;

public class The_GameFlowManager : MonoBehaviour
{
    private enum GameState { MWMovement, RotationMovement, StarMovement, RandomMovement, EndScreen }
    private GameState currentState;

    public MWMovement mwMovementScript;
    public RotationMovement rotationMovementScript;
    public StarMovement starMovementScript;
    public RandomMovement randomMovementScript;

    public float stateTimer;

    void Start()
    {
        EnterState(GameState.MWMovement);
    }

    void Update()
    {
        stateTimer -= Time.deltaTime;

        if (stateTimer <= 0)
        {
            switch (currentState)
            {
                case GameState.MWMovement:
                    EnterState(GameState.RotationMovement);
                    break;
                case GameState.RotationMovement:
                    EnterState(GameState.StarMovement);
                    break;
                case GameState.StarMovement:
                    EnterState(GameState.RandomMovement);
                    break;
                case GameState.RandomMovement:
                    EnterState(GameState.EndScreen);
                    break;
                case GameState.EndScreen:
                    Debug.Log("Game Over");
                    break;
            }
        }
    }

    void EnterState(GameState newState)
    {
        ExitCurrentState();

        currentState = newState;

        switch (newState)
        {
            case GameState.MWMovement:
                stateTimer = 60f;
                mwMovementScript.SpawnTarget(Color.red, 1.5f);
                mwMovementScript.enabled = true;
                break;

            case GameState.RotationMovement:
                stateTimer = 20f;
                rotationMovementScript.SpawnTarget(Color.green, 1.2f);
                rotationMovementScript.enabled = true;
                break;

            case GameState.StarMovement:
                stateTimer = 20f;
                starMovementScript.SpawnTarget(Color.blue, 1.0f);
                starMovementScript.enabled = true;
                break;

            case GameState.RandomMovement:
                stateTimer = 20f;
                randomMovementScript.SpawnTarget(Color.yellow, 1.3f);
                randomMovementScript.enabled = true;
                break;

            case GameState.EndScreen:
                stateTimer = 5f;
                Debug.Log("Game End");
                break;
        }
    }

    void ExitCurrentState()
    {
        switch (currentState)
        {
            case GameState.MWMovement:
                mwMovementScript.DestroyTarget();
                mwMovementScript.enabled = false;
                break;
            case GameState.RotationMovement:
                rotationMovementScript.DestroyTarget();
                rotationMovementScript.enabled = false;
                break;
            case GameState.StarMovement:
                starMovementScript.DestroyTarget();
                starMovementScript.enabled = false;
                break;
            case GameState.RandomMovement:
                randomMovementScript.DestroyTarget();
                randomMovementScript.enabled = false;
                break;
        }
    }
}
