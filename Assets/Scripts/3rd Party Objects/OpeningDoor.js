#pragma strict

function OnCollisionEnter2D (coll : Collision2D) {

	if (coll.gameObject.tag == "TheGuy") {
		Destroy(this.gameObject);
		GameObject.FindGameObjectWithTag("DoorOpenSound").GetComponent(AudioSource).Play();
	}

}
