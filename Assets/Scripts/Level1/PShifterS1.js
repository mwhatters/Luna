﻿#pragma strict

private var cameraIsStatic : boolean;
private var boxesUnfrozen = false;

function Start () {
	cameraIsStatic = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).staticCamera();
	Debug.Log(cameraIsStatic);

	Debug.Log(GameObject.FindGameObjectWithTag("MainCamera").GetComponent(Camera).orthographicSize);
}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name != "Luna") { return false; }

	if (!cameraIsStatic) {
		GameObject.FindGameObjectWithTag("TheGuy").transform.DetachChildren();
		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).panCameraTo(Vector3(-270, 10, -8), 1.0, 25);


		if (!boxesUnfrozen) {
			for (var box in ["R1B1", "R1B2", "R1B3", "R1B4", "R1B5", "R1B6"]) {
				var object = GameObject.Find(box);
				object.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
			}

			boxesUnfrozen = true;
		}

		GameObject.FindGameObjectWithTag("ExpandSound").GetComponent(AudioSource).Play();


	}

	if (cameraIsStatic) {
		var luna = GameObject.FindGameObjectWithTag("TheGuy");
		GameObject.FindGameObjectWithTag("MainCamera").transform.parent = luna.transform;

		var rigidbody = luna.GetComponent(Rigidbody2D);
		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).panCameraTo(Vector3(luna.transform.position.x, luna.transform.position.y, -8), 0, 16);

	}

	cameraIsStatic = !cameraIsStatic;
	GameObject.FindGameObjectWithTag("RestrainSound").GetComponent(AudioSource).Play();

}