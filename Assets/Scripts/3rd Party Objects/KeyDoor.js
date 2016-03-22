#pragma strict

public var keyNeeded : String;


function Start () {

}

function Update () {

}


function OnCollisionEnter2D(coll : Collision2D) {
	Debug.Log(coll.gameObject.tag);
	if (coll.gameObject.tag == "TheGuy") {

		for (var key in coll.gameObject.GetComponent(PlayerGameStates).keysFound) {
			if (key.name == keyNeeded) {
				GameObject.FindGameObjectWithTag("DoorOpenSound").GetComponent(AudioSource).Play();
				Destroy(this.gameObject);
			}
		}


	}
}
