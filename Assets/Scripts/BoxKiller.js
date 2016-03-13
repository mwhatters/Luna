#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name != "Luna") { 
		Destroy(coll.GetComponent(SpriteRenderer));
		Destroy(coll);
	}
}