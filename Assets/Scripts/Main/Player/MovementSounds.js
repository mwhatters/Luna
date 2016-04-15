//not used

public var onGround : boolean = false;
var footstepSound : AudioSource;
var luna : MainGravity;

var canTriggerWalkSound : boolean = true;
var nextWalk;

var walkCycle = 0.2;

function Start() {
  luna = GetComponent(MainGravity);
  footstepSound = GetComponent(AudioSource);
  nextWalk = Time.time;
}

function Update() {
    // if (CanTriggerWalk()) {
    //   footstepSound.Play();
    // } else {
    //   footstepSound.Stop();
    // }
}


function CanTriggerWalk() {
  if (
    (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D)) &&
    onGround == true &&
    Time.time >= nextWalk &&
    canTriggerWalkSound == true
  ) {
    setTimeToNextWalk();
    return true;
  } else {
    return false;
  }
}

function setTimeToNextWalk() {
  nextWalk = Time.time + walkCycle;
}
