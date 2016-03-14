#pragma strict

private var cameraIsStatic : boolean;
private var boxesUnfrozen = false;
public var objectsList : String;
public var cameraZ : int = -8;

public var y : float;
public var x : float;
public var zIn : float;
public var zOut : float;

function Start () {}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name != "Luna") { return false; }

	var camera = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);

		var lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
	
		camera.isStatic = true;
	
		camera.panCameraTo(Vector3(x, y, cameraZ), 1, zIn);

		if (!boxesUnfrozen && objectsList != "") {
			var objects = objectsList.Split(" "[0]);
			for (var box in objects) {
				var object = GameObject.Find(box);
//				object.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
			}
		}

		boxesUnfrozen = true;
		GameObject.FindGameObjectWithTag("ExpandSound").GetComponent(AudioSource).Play();
}

function OnTriggerExit2D(coll : Collider2D) {
		if (coll.name == "Luna") {
			var camera = GameObject.FindGameObjectWithTag("MainCamera");

			yield StartCoroutine("panCameraToLuna");

			camera.GetComponent(CameraBehavior).isStatic = false;
		}


}


function panCameraToLuna() {
	var camera2 = GameObject.FindGameObjectWithTag("MainCamera");
	var luna = GameObject.FindGameObjectWithTag("TheGuy");
	var rigidbody = luna.GetComponent(Rigidbody2D);

	camera2.GetComponent(CameraBehavior).panCameraTo(Vector3(luna.transform.position.x, luna.transform.position.y, cameraZ), 0.2, zOut);
	GameObject.FindGameObjectWithTag("RestrainSound").GetComponent(AudioSource).Play();
}

