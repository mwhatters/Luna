#pragma strict

public var object : GameObject;
var objRigidBody : Rigidbody2D;

public var direction : String = "x";
public var active : boolean = false;
public var rate : float = 6;
public var time : float = 5;

private var nextReverse : float = 0;
private var reversed : boolean = false;

function Start () {
  object = this.gameObject;
  objRigidBody = object.GetComponent(Rigidbody2D);

  nextReverse = Time.time;
  reversed = true;
}

function FixedUpdate() {
  if (!active) { return; }

  if (Time.time > nextReverse) {
    reverseDirections();
    reversed = !reversed;
    nextReverse += time;
  }
}

function reverseDirections() {
  if (direction == "x") {
    if (objRigidBody.velocity.x == 0) { objRigidBody.velocity.x = rate; }
    else { objRigidBody.velocity.x = -(objRigidBody.velocity.x); }
  } else if (direction == "y") {
    if (objRigidBody.velocity.y == 0) { objRigidBody.velocity.y = rate; }
    else { objRigidBody.velocity.y = -(objRigidBody.velocity.y); }
  }
}
