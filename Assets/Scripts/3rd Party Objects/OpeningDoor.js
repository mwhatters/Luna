#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter2D (coll : Collision2D) {

	Debug.Log(coll.gameObject.tag);

	if (coll.gameObject.tag == "TheGuy") {
		Destroy(this.gameObject);
		GameObject.FindGameObjectWithTag("DoorOpenSound").GetComponent(AudioSource).Play();
	} else {
		return false;
	}
}