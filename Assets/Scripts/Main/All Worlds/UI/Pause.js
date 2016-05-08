#pragma strict

public var isPaused : boolean = false;
var pausePanel : GameObject;
var pausedText : GameObject;
var escapeText : GameObject;
var luna : GameObject;

function Start () {
  pausePanel = GameObject.Find("PausePanel");
  pausedText = GameObject.Find("PauseText");
  escapeText = GameObject.Find("Escape");
  luna = GameObject.Find("Luna");
}

function Update () {
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

function setPaused() {
  activatePauseUI(true);
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
  luna.GetComponent(MainGravity).isFrozen = bool;
}
