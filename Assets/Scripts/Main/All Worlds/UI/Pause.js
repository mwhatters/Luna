#pragma strict

public var canPause : boolean = true;
public var isPaused : boolean = false;
private var pausePanel : GameObject;
private var pausedText : GameObject;
private var escapeText : GameObject;
private var SaveButton : GameObject;
private var QuitButton : GameObject;
private var successText : GameObject;
private var luna : GameObject;

function Start () {
  pausePanel = GameObject.Find("PauseUI");
  pausedText = GameObject.Find("PauseText");
  escapeText = GameObject.Find("Escape");
  successText = GameObject.Find("SuccessText");
  SaveButton = GameObject.Find("Save Game");
  QuitButton = GameObject.Find("Quit Game");
  luna = GameObject.Find("Luna");
}

function Update () {

  if (!canPause) { return false; }

  if (Input.GetButtonDown("Cancel") && !isPaused) {
    setPaused();
    isPaused = true;
    return isPaused;
  }

  if (Input.GetButtonDown("Cancel") && isPaused) {
    setUnPaused();
    isPaused = false;
    return isPaused;
  }
}

function OnMouseDown () {
  Debug.Log("nope");
  return false;
}

function setPaused() {
  activatePauseUI(true);
  SaveButton.GetComponent(Button).Select();
  Time.timeScale = 0;
}

function setUnPaused() {
  activatePauseUI(false);
  Time.timeScale = 1;
}

function activatePauseUI(bool) {
  pausePanel.GetComponent(Image).enabled = bool;
  pausedText.GetComponent(Text).enabled = bool;
  escapeText.GetComponent(Text).enabled = bool;
  SaveButton.GetComponent(Text).enabled = bool;
  SaveButton.GetComponent(Button).enabled = bool;
  QuitButton.GetComponent(Text).enabled = bool;
  QuitButton.GetComponent(Button).enabled = bool;
  luna.GetComponent(MainGravity).isFrozen = bool;


  if (successText.GetComponent(Text).enabled == true) {
    successText.GetComponent(Text).enabled = bool;
  }

  // highlight save button on pause display
}

public function saveGameFromPaused() {
  SaveData.use.SaveGame(SaveData.currentData.username, Application.loadedLevelName);
  successText.GetComponent(Text).text = "Game Data Saved for: " + SaveData.currentData.username;
  successText.GetComponent(Text).enabled = true;
}

public function ReturnToMenu() {
  if (SaveData.currentData) {
    SaveData.use.SaveGame(SaveData.currentData.username, Application.loadedLevelName);
  }

  Time.timeScale = 1;
  SceneFX.use.FadeImageToBlack("Blackness", 0.3);
  Invoke("LoadMenu", 3.5);
}

public function Quit() {
  Application.Quit();
}

function LoadMenu() {
  SceneManager.LoadScene("MainMenu");
}
