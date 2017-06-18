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

function Device() {
	return device;
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

// Menu

function MenuMoveUp() {
	return (
		device.RightStickUp.State ||
		Input.GetKey(KeyCode.W)
	);
}

function MenuMoveDown() {
	return (
		device.RightStickDown.State ||
		Input.GetKey(KeyCode.S)
	);
}

function TextEntryUp() {
	return (
		device.DPadDown.WasPressed
	);
}

function TextEntryDown() {
	return (
		device.DPadUp.WasPressed
	);
}

function TextEntryDelete() {
	return (
		device.Action2.WasPressed ||
		device.DPadLeft.WasPressed
	);
}

function TextEntry() {
	return (
		device.Action1.WasPressed ||
		device.DPadRight
	);
}

function TextSubmit() {
	return (
		device.Command.WasPressed
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
