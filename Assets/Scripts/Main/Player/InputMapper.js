#pragma strict

import InControl;

private var AButton = "";
private var MovementAxis = "";
private var GravRotateRightButton = "";
private var GravRotateLeftButton = "";
private var BackButton = "";

static var input : InputMapper;
private var device : InputDevice;

function Awake () {
	device = InputManager.ActiveDevice;
	if (input) {
		return;
	}
	input = this;
}

function Update() {
	device = InputManager.ActiveDevice;
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
    this.MoveLeft() ||
		this.MoveRight()
  );
}

function Suicide() {
  return (
		device.DPadDown.WasPressed ||
    Input.GetKeyDown(KeyCode.Backspace)
  );
}

function RotateRight() {
  return (
		device.RightTrigger.WasPressed ||
		device.RightBumper.WasPressed ||
    Input.GetKeyDown(KeyCode.RightArrow)
  );
}

function RotateLeft() {
  return (
		device.LeftTrigger.WasPressed ||
		device.LeftBumper.WasPressed ||
    Input.GetKeyDown(KeyCode.LeftArrow)
  );
}

function Jump() {
  return (
		device.Action1.WasPressed ||
    Input.GetKeyDown(KeyCode.Space)
  );
}

function MoveLeft() {
  return (
    Input.GetKey(KeyCode.A) ||
		device.LeftStickLeft.Value > 0.40
  );
}

function MoveRight() {
  return (
    Input.GetKey(KeyCode.D) ||
		device.LeftStickRight.Value > 0.40
  );
}
