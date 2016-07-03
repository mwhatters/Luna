#pragma strict

function OnTriggerEnter2D (coll : Collider2D) {
	if (coll.gameObject.tag == "TheGuy") {
		addToArray(coll, this.gameObject);
		Sounds.use.PlaySoundByTag("GrabKeySound");
		DestroyKey();
	}
}

function addToArray (coll: Collider2D, obj : GameObject) {
  coll.gameObject.GetComponent(PlayerGameStates).keysFound += [obj];
}

function DestroyKey() {
 Destroy(GetComponent(SpriteRenderer));

 for (var collider in GetComponents(BoxCollider2D)) {
	 Destroy(collider);
 };
}
