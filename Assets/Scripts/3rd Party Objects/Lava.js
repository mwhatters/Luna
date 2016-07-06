﻿#pragma strict

public var lavaDir : String = "up";

function Update () {

  if (lavaDir == "up") {
    adjustLava(Vector3.up);
  } else if (lavaDir == "down") {
      adjustLava(Vector3.down);
  } else if (lavaDir == "left") {
      adjustLava(Vector3.left);
  } else if (lavaDir == "right") {
      adjustLava(Vector3.right);
  }


}


function adjustLava(vector : Vector3) {
  for (var child : Transform in transform) {
    child.transform.position += vector * 0.06;
  }
}
