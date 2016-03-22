#pragma strict

public var triggerBall : GameObject;
public var doorToUnlock : GameObject;

function OnTriggerEnter2D(coll : Collider2D) {

	var triggerBallCollider = triggerBall.GetComponent(CircleCollider2D);

	if (coll == triggerBallCollider) {
		triggerBall.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;

		Destroy(doorToUnlock.GetComponent(SpriteRenderer));
		Destroy(doorToUnlock.GetComponent(BoxCollider2D));


	}


}
