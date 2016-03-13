#pragma strict

private var cameraIsStatic : boolean;
private var boxesUnfrozen = false;
public var objectsList : String;

public var y : float;
public var x : float;
public var zIn : float;
public var zOut : float;

function Start () {
	cameraIsStatic = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).staticCamera();
}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name != "Luna") { return false; }

	if (!cameraIsStatic) {
		var camera = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
		var lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
	
		lunaObj.transform.DetachChildren();
	

		camera.panCameraTo(Vector3(x, y, -8), 1.0, zIn);

		if (!boxesUnfrozen) {
			var objects = objectsList.Split(" "[0]);
			for (var box in objects) {
				var object = GameObject.Find(box);
				object.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
			}
		}

		boxesUnfrozen = true;
		GameObject.FindGameObjectWithTag("ExpandSound").GetComponent(AudioSource).Play();

	}

	if (cameraIsStatic) {
		var luna = GameObject.FindGameObjectWithTag("TheGuy");
		var cameraStatic = GameObject.FindGameObjectWithTag("MainCamera");
		cameraStatic.transform.parent = luna.transform;

		var rigidbody = luna.GetComponent(Rigidbody2D);
		cameraStatic.GetComponent(CameraBehavior).panCameraTo(Vector3(luna.transform.position.x, luna.transform.position.y, -8), 0, zOut);

	}

	cameraIsStatic = !cameraIsStatic;
	GameObject.FindGameObjectWithTag("RestrainSound").GetComponent(AudioSource).Play();

}