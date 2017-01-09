#pragma downcast

public var lavaDir : String = "up";
public var active : boolean = false;
public var rate : float = 0.06;
public var tracker : GameObject;

public var backAndForthTimer : boolean = false;
public var time : float = 5;

private var nextReverse : float = 0;
private var reversed : boolean = false;

function Start() {
  nextReverse = 0;
  reversed = false;
}

function FixedUpdate() {

  if (!active) { return false; }

  if (backAndForthTimer) {
    if (Time.time > nextReverse) {
      reverseDirections();
      reversed = !reversed;
      nextReverse += time;
    }
  }

  if (lavaDir == "up") {
    adjustLava(Vector3.up);
  } else if (lavaDir == "down") {
      adjustLava(Vector3.down);
  } else if (lavaDir == "left") {
      adjustLava(Vector3.left);
  } else if (lavaDir == "right") {
      adjustLava(Vector3.right);
  }

  return true;
}


function reverseDirections() {
  switch (lavaDir)
  {
    case "up":
      lavaDir = "down";
      break;
    case "down":
      lavaDir = "up";
      break;
    case "left":
      lavaDir = "right";
      break;
    case "right":
      lavaDir = "left";
      break;
  }
}

function adjustLava(vector : Vector3) {
  if (tracker) { tracker.transform.position += vector * rate; }
  for (var child : Transform in transform) {
    child.transform.position += vector * rate;
  }
}
