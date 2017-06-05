#pragma strict

import InControl;
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
