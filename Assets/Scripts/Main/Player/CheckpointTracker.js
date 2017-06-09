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
  var mainCamera = GameObject.Find("Camera").GetComponent(Camera);

  luna.transform.position = pos;
  mainCamera.transform.position.x = pos.x;
  mainCamera.transform.position.y = pos.y;
  
  luna.GetComponent(MainGravity).adjustGravityTo(gravityDirection);

  if (cameraSize > 0) {

    mainCamera.fieldOfView = cameraSize;
  }
}
