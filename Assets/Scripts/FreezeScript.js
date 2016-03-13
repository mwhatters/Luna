#pragma strict

public var frozen = false;

function Start () {

}

function Update () {

	if (frozen) {
		setNoMovements();
		return false;
	}

}


function setNoMovements() {
	GetComponent(Rigidbody2D).velocity = new Vector2(0,0);
}