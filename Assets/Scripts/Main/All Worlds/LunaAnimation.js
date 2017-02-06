#pragma strict

private var luna : GameObject;
private var state : MainGravity;
private var animator : Animator;
private var rigidBody : Rigidbody2D;

public var forceIdle : boolean = false;

function Start() {
	luna = this.gameObject;
	state = luna.GetComponent(MainGravity);
	animator = luna.GetComponent(Animator);
	rigidBody = luna.GetComponent(Rigidbody2D);
}

function Update() {
	if (forceIdle) {
		SetIdle();
		return;
	}

	if (rigidBody.velocity == Vector2(0,0)) {
		SetIdle();
	} else {
		animator.ResetTrigger("IsIdle");
	}

	if (state.isMoving && state.touchingGround) {
		animator.ResetTrigger("InAir");
		animator.ResetTrigger("IsIdle");
		animator.SetTrigger("Moving");
	} else {
		animator.ResetTrigger("Moving");
	}

	if (state.touchingGround) {
		animator.ResetTrigger("InAir");
	} else {
		animator.SetTrigger("InAir");
		animator.ResetTrigger("Moving");
		animator.ResetTrigger("IsIdle");
	}
}

function SetIdle() {
	animator.ResetTrigger("InAir");
	animator.ResetTrigger("Moving");
	animator.SetTrigger("IsIdle");
}
