#pragma strict

// "Left" or "Right"
public var rotation : String = "Left";
public var rate : float = 0.5;

function Start() {
  if (rotation == "Left") {
    rate = -rate;
  }
}

function FixedUpdate () {
  transform.Rotate(Vector3.forward * rate);
}
