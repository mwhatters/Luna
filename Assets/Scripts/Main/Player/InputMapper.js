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

function Pause() {
	return (
		device.Command.WasPressed ||
		Input.GetButtonDown("Cancel")
	);
}

function IsMoving() {
  return (
    this.MoveLeft() ||
		this.MoveRight()
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

function Suicide() {
  return (
		device.DPadDown.WasPressed ||
    Input.GetKeyDown(KeyCode.Backspace)
  );
}

// Experimental

function RotateUp180() {
	return (
		Input.GetKeyDown(KeyCode.UpArrow)
	);
}

function RotateDown180() {
	return (
		Input.GetKeyDown(KeyCode.DownArrow)
	);
}

function Rotate45Right() {
	return (
		Input.GetKeyDown(KeyCode.K)
	);
}

function Rotate45Left() {
	return (
		Input.GetKeyDown(KeyCode.L)
	);
}
