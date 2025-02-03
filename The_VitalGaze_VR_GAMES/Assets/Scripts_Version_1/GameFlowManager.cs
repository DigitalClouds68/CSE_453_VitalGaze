using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameFlowManager : MonoBehaviour {
    private enum GameState {
        StartScreen, 
        MWMovement, 
        RotationMovement, 
        StarMovement, 
        RandomMovement, 
        EndScreen
    }

    private GameState currentState = GameState.StartScreen;

    public MW_Movement mwMovementScript;
    public Rotation_Movement rotationMovementScript;
    public Star_Movement starMovementScript;
    public Random_Movement randomMovementScript;

    public Text uiText;

    private float stateTimer = 0f;

    void Start() {
        mwMovementScript.enabled = false;
        rotationMovementScript.enabled = false;
        starMovementScript.enabled = false;
        randomMovementScript.enabled = false;

        DestroyPreviousTargets();

        EnterState(GameState.StartScreen);
    }

    void Update() {
        stateTimer -= Time.deltaTime;
    
        ///////////////////////
        UpdateCoordinateText();
        ///////////////////////

        switch (currentState) {
            case GameState.StartScreen:
                if (stateTimer <= 0) {
                    EnterState(GameState.MWMovement);
                }
                break;

            case GameState.MWMovement:
                if (stateTimer <= 0) {
                    EnterState(GameState.RotationMovement);
                }
                break;

            case GameState.RotationMovement:
                if (stateTimer <= 0) {
                    EnterState(GameState.StarMovement);
                }
                break;

            case GameState.StarMovement:
                if (stateTimer <= 0) {
                    EnterState(GameState.RandomMovement);
                }
                break;

            case GameState.RandomMovement:
                if (stateTimer <= 0) {
                    EnterState(GameState.EndScreen);
                }
                break;

            case GameState.EndScreen:
                break;
        }
    }

    void EnterState(GameState newState) {
        ExitCurrentState();
        
        currentState = newState;

        switch (newState) {
            case GameState.StartScreen:
                stateTimer = 1f;
//              uiText.text = "Game Starting in 3, 2, 1...";
                break;

            case GameState.MWMovement:
                stateTimer = 10f;
                mwMovementScript.enabled = true;
                mwMovementScript.SpawnTarget();
//              uiText.text = "MW Movement";
                break;

            case GameState.RotationMovement:
                stateTimer = 10f;
                rotationMovementScript.enabled = true;
                rotationMovementScript.SpawnTarget();
//              uiText.text = "Rotation Movement";
                break;

            case GameState.StarMovement:
                stateTimer = 10f;
                starMovementScript.enabled = true;
                starMovementScript.SpawnTarget();
//              uiText.text = "Star Movement";
                break;

            case GameState.RandomMovement:
                stateTimer = 10f;
                randomMovementScript.enabled = true;
                randomMovementScript.SpawnTarget();
//              uiText.text = "Random Movement";
                break;

            case GameState.EndScreen:
                stateTimer = 5f;
//              uiText.text = "Game Over. Well Done!";
                Invoke("HandleGameEnd", stateTimer);
                break;
        }
    }

    void ExitCurrentState() {
        // Make sure to refresh then jump to the next mode
        switch (currentState) {
            case GameState.MWMovement:
                mwMovementScript.enabled = false;
                mwMovementScript.DestroyTarget();
                break;

            case GameState.RotationMovement:
                rotationMovementScript.enabled = false;
                rotationMovementScript.DestroyTarget();
                break;

            case GameState.StarMovement:
                starMovementScript.enabled = false;
                starMovementScript.DestroyTarget();
                break;

            case GameState.RandomMovement:
                randomMovementScript.enabled = false;
                randomMovementScript.DestroyTarget();
                break;
        }
    }

    void DestroyPreviousTargets() {
        mwMovementScript.DestroyTarget();
        rotationMovementScript.DestroyTarget();
        starMovementScript.DestroyTarget();
        randomMovementScript.DestroyTarget();
    }

    void HandleGameEnd() {
        DestroyPreviousTargets();

        // Notify React Native or exit
        #if UNITY_EDITOR
        Debug.Log("Game has ended."); // Output the debugging messages under the debugger mode
        UnityEditor.EditorApplication.isPlaying = false; // 停止编辑器中的游戏运行
        #else
        Application.Quit();
        #endif
    }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

    public Text coordinateText;
    // Added: Update axis(x, y ,z) Real-time
    void UpdateCoordinateText()
    {
        Vector3 position = Vector3.zero;

        // Get the Real-Time axis depends on the current activities status
        switch (currentState)
        {
            case GameState.MWMovement:
                if (mwMovementScript.movingTarget != null)
                    position = mwMovementScript.movingTarget.transform.position;
                break;

            case GameState.RotationMovement:
                if (rotationMovementScript.movingTarget != null)
                    position = rotationMovementScript.movingTarget.transform.position;
                break;

            case GameState.StarMovement:
                if (starMovementScript.movingTarget != null)
                    position = starMovementScript.movingTarget.transform.position;
                break;

            case GameState.RandomMovement:
                if (randomMovementScript.movingTarget != null)
                    position = randomMovementScript.movingTarget.transform.position;
                break;
        }

        // Update the axis text to the phone screemn
        coordinateText.text = $"Coordinates: (x: {position.x:F2}, y: {position.y:F2}, z: {position.z:F2})";
    }
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
}
