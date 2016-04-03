#pragma strict

public static var checkPointPos : Vector3;

function Start() {
  if (checkPointPos == Vector3(0,0,0)){
  } else {
    MovePlayerToCheckpoint(checkPointPos);
  }
}

function MovePlayerToCheckpoint(pos : Vector3) {
  GameObject.Find("Luna").transform.position = pos;
}
