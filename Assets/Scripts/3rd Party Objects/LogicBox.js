#pragma strict

public var enableSound : boolean = false;
var active : boolean = false;
var soundActive : boolean = false;
var children : Component[];

var xMove : float = 0.0;
var yMove : float = 0.0;
var rotateRate : float = 0.0;

function Start () {
  children = gameObject.GetComponentsInChildren(Transform);
}

function Update() {
  if (enableSound) {
    if (active && !soundActive) {
      Sounds.use.EnableSoundByName("LaserHigh", 0.5);
      Sounds.use.EnableSoundByName("LaserLow", 0.5);
      Sounds.use.PlaySoundByName("LaserHigh");
      Sounds.use.PlaySoundByName("LaserLow");
      soundActive = true;
    } else if (!active && soundActive) {
      Sounds.use.DisableSoundByName("LaserHigh");
      Sounds.use.DisableSoundByName("LaserLow");
      soundActive = false;
    }
  }
}

function FixedUpdate () {
  transform.Rotate(Vector3.forward * rotateRate);
  GetComponent(Rigidbody2D).velocity.y = yMove;
  GetComponent(Rigidbody2D).velocity.x = xMove;
}


function Enable() {
  active = true;
  for (var child : Transform in children) {
    if (child == this.transform) { continue; }
    child.GetComponent(GravLaser).active = true;
  }
}

function Disable() {
  active = false;
  for (child in children) {
    if (child == this.transform) { continue; }
    child.GetComponent(GravLaser).active = false;
  }
}

function SetMovement(x,y,r) {
  SetX(x); SetY(y); SetR(r);
}

function DisableMovement() {
  rotateRate = 0.0;
  yMove = 0.0;
  xMove = 0.0;
}

function SetX(fl) {
  xMove = fl;
}

function SetY(fl) {
  yMove = fl;
}

function SetR(fl) {
  rotateRate = fl;
}
