#pragma strict

private var triggered : boolean = true;

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;
    var luna = GameObject.Find("Luna");
    var gravity = luna.GetComponent(MainGravity);

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
  }

}
