#pragma strict

function OnCollisionEnter2D (coll : Collision2D) {

	if (coll.gameObject.tag == "TheGuy") {
		addToArray(coll, this.gameObject);
		Destroy(this.gameObject.GetComponent(SpriteRenderer));
		Destroy(this.gameObject.GetComponent(BoxCollider2D));
		GameObject.FindGameObjectWithTag("GrabKeySound").GetComponent(AudioSource).Play();
	}

}


 function addToArray (coll: Collision2D, obj : GameObject) {
    coll.gameObject.GetComponent(PlayerGameStates).keysFound += [obj];
 }
