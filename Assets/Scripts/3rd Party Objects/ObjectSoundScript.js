#pragma strict

static var nextSound = 0.0;
static var soundRate = 0.25;


function Start () {

}

function Update () {

}

function OnCollisionEnter2D (coll : Collision2D) {
	if (coll.gameObject.CompareTag("Ground") || coll.gameObject.CompareTag("NiceBox") || coll.gameObject.CompareTag("DeathRock")) {

		if (canPlaySound()) {
			GameObject.FindGameObjectWithTag("ThumpSound").GetComponent(AudioSource).Play();
			nextSound = Time.time + soundRate;
		} else {
//			Debug.Log("did not play");
		}

	}
}


function canPlaySound() {
	return Time.time > nextSound;
}