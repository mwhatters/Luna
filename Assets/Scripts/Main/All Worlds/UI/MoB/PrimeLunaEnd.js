#pragma strict

private var triggered : boolean = false;

public var shouldTriggerEvil : boolean = false;
public static var evilHasBegun : boolean = false;

private var luna : GameObject;
private var gravity : MainGravity;
private var camObj : GameObject;

function Start() {
  luna = GameObject.Find("Luna");
  gravity = luna.GetComponent(MainGravity);
  camObj = GameObject.Find("Camera");
}

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;

    if (shouldTriggerEvil) {
      evilHasBegun = true;
    }

    rotateGravityCorrectly();
  }
}

function rotateGravityCorrectly() {
  if (gravity.gravityDirection == Direction.Down) {
    // good, we want this
  } else if (gravity.gravityDirection == Direction.Up) {
    gravity.adjustGravity180();
    gravity.rotatePlayerAndObjects(180);
    gravity.rotateCameraInDegrees(180);
  } else if (gravity.gravityDirection == Direction.Left) {
    gravity.adjustGravityRight();
    gravity.rotatePlayerAndObjects(90);
    gravity.rotateCameraInDegrees(90);
  } else if (gravity.gravityDirection == Direction.Right) {
    gravity.adjustGravityLeft();
    gravity.rotatePlayerAndObjects(-90);
    gravity.rotateCameraInDegrees(-90);
  }

  gravity.canRotate = false;
  gravity.canMove = false;

  yield WaitForSeconds(0.5);
  ensureLunaAndCameraAreDown();
};


function ensureLunaAndCameraAreDown() {
  if (luna.transform.eulerAngles.z != 0 || camObj.transform.eulerAngles.z != 0) {
    luna.transform.eulerAngles.z = 0;
    camObj.transform.eulerAngles.z = 0;
  }
}
