#pragma strict

public var lavaDir : String = "up";
public var active : boolean = false;
public var rate : float = 0.06;

function FixedUpdate () {

  if (!active) { return false; }
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
    child.transform.position += vector * rate;
  }
}
