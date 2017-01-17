#pragma strict

function Update() {
	var state = GetComponent(MainGravity);
	var animator = GetComponent(Animator);
	var rigidbody = GetComponent(Rigidbody2D);

	if (rigidbody.velocity == Vector2(0,0)) {
		animator.ResetTrigger("InAir");
		animator.ResetTrigger("Moving");
		animator.SetTrigger("IsIdle");
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
