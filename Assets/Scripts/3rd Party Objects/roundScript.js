#pragma strict

var children : Component[];

public var down : boolean = false;
public var left : boolean = false;
public var right : boolean = false;
public var up : boolean = false;

public var speed : int = 12;

function Start () {
  children = gameObject.GetComponentsInChildren(Transform);
}

function FixedUpdate() {
  if (!up && !down && !left && !right) { return false; }

  for (var child : Transform in children) {
    if (child == this.transform) { continue; }

    if (down) {
      child.GetComponent(Rigidbody2D).velocity.y = -speed;
    }

    if (up) {
      child.GetComponent(Rigidbody2D).velocity.y = speed;
    }

    if (left) {
      child.GetComponent(Rigidbody2D).velocity.x = -speed;
    }

    if (right) {
      child.GetComponent(Rigidbody2D).velocity.x = speed;
    }
  }
}
