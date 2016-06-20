#pragma strict

public var xspeed = 9;
public var yspeed = -9;

private var nextBounce = 0.0;
private var bounceRate = 0.1;

function FixedUpdate () {
	GetComponent(Rigidbody2D).velocity.y = yspeed;
	GetComponent(Rigidbody2D).velocity.x = xspeed;
}

function OnCollisionEnter2D (coll : Collision2D) {

	if (!(coll.gameObject.CompareTag("Ground") || coll.gameObject.CompareTag("FizDoor") || coll.gameObject.CompareTag("DeathBall"))) { return; }

	for (var hits: ContactPoint2D in coll.contacts) {
		var hitPoint: Vector2 = hits.normal;
		setSpeeds(hitPoint);
	}
}

function setSpeeds(hitPoint : Vector2) {

	if (!canBounce()) { return; }

	if (hitPoint.x != 0) {
		xspeed = -xspeed;
	}

	if (hitPoint.y != 0) {
		yspeed = -yspeed;
	}

	nextBounce = Time.time + bounceRate;

}

function canBounce() {
	return Time.time > nextBounce;
}

// neg x = (-1, 0)
// pos x = (1, 0)
// neg y = (0, -1)
// pos y = (0, 1)
