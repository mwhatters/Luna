#pragma strict

function OnCollisionEnter2D (coll : Collision2D) {

	if (coll.gameObject.tag == "TheGuy") {
		addToArray(coll, this.gameObject);
		Destroy(GetComponent(SpriteRenderer));
		Destroy(GetComponent(BoxCollider2D));
		Sounds.use.PlaySoundByTag("GrabKeySound");
	}
}

 function addToArray (coll: Collision2D, obj : GameObject) {
    coll.gameObject.GetComponent(PlayerGameStates).keysFound += [obj];
 }
