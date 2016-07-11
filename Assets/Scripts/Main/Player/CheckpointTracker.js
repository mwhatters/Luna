#pragma strict

public static var checkPointPos : Vector3;
public static var gravityDirection : String;
public static var cameraSize : int = 0;

function Start() {
  if (checkPointPos == Vector3(0,0,0)){
  } else {
    MovePlayerToCheckpoint(checkPointPos);
  }
}

function MovePlayerToCheckpoint(pos : Vector3) {
  var luna = GameObject.Find("Luna");
  luna.transform.position = pos;
  luna.GetComponent(MainGravity).adjustGravityTo(gravityDirection);

  if (cameraSize > 0) {
    var mainCamera = GameObject.Find("Camera").GetComponent(Camera);
    mainCamera.fieldOfView = cameraSize;
  }
}
