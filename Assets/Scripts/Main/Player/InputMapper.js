#pragma strict

import InControl;

private var AButton = "";
private var MovementAxis = "";
private var GravRotateRightButton = "";
private var GravRotateLeftButton = "";
private var BackButton = "";

static var input : InputMapper;

function Awake () {
	if (input) {
		return;
	}
	input = this;
}

function Update() {
	Debug.log(InputMapper);
}

function Start() {
  var gameSettings;
  if (!GameObject.Find("GameSettings")) {
    gameSettings = false;
  }

  if (!gameSettings) { // dev
    AButton = "A Button Macintosh";
    MovementAxis = "Left Joystick Macintosh";
    GravRotateRightButton = "Right Trigger Macintosh";
    GravRotateLeftButton = "Left Trigger Macintosh";
    BackButton = "Back Button Macintosh";
  } else {
    var gameSettingsRef : GameObject = GameObject.Find("GameSettings");

    AButton = gameSettingsRef.GetComponent(GameSettings).AButton;
    MovementAxis = gameSettingsRef.GetComponent(GameSettings).MovementAxis;
    GravRotateRightButton = gameSettingsRef.GetComponent(GameSettings).GravRotateRightButton;
    GravRotateLeftButton = gameSettingsRef.GetComponent(GameSettings).GravRotateLeftButton;
    BackButton = gameSettingsRef.GetComponent(GameSettings).BackButton;
  }
}

function IsMoving() {
  return (
    (Input.GetKey(KeyCode.A) ||
    Input.GetAxis(MovementAxis) < -0.40)  ||

    (Input.GetKey(KeyCode.D) ||
    Input.GetAxis(MovementAxis) >  0.40)
  );
}

function Suicide() {
  return (
    Input.GetKeyDown(KeyCode.Backspace) ||
    Input.GetButtonDown(BackButton)
  );
}

function RotateRight() {
  return (
    Input.GetKeyDown(KeyCode.RightArrow) ||
    Input.GetAxis(GravRotateRightButton) > 0
  );
}

function RotateLeft() {
  return (
    Input.GetKeyDown(KeyCode.LeftArrow) ||
    Input.GetAxis(GravRotateLeftButton) > 0
  );
}

function Jump() {
  return (
    Input.GetButtonDown(AButton)
  );
}

function MoveLeft() {
  return (
    Input.GetKey(KeyCode.A) ||
    Input.GetAxis(MovementAxis) < -0.40
  );
}

function MoveRight() {
  return (
    Input.GetKey(KeyCode.D) ||
    Input.GetAxis(MovementAxis) >  0.40
  );
}
