#pragma strict


private var cameraObj : CameraBehavior;
private var lunaObj : GameObject;


private var cameraIsStatic : boolean;
private var boxesUnfrozen = false;
public var objectsList : String;
public var cameraZ : int = -8;

public var y : float;
public var x : float;
public var zIn : float;
public var zOut : float;

public var transitionEnterTime : float;

public var zoomOnly : boolean = false;


function Start () {
	cameraObj = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
	lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name != "Luna") { return false; }

		if (zoomOnly) {
			cameraObj.zoomCamera(transitionEnterTime, zIn);
		} else {
			cameraObj.isStatic = true;
			cameraObj.panCameraTo(Vector3(x, y, cameraZ), transitionEnterTime, zIn);
		}

		if (!boxesUnfrozen && objectsList != "") {
			var objects = objectsList.Split(" "[0]);
			for (var box in objects) {
				var object = GameObject.Find(box);
				object.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
			}
		}

		boxesUnfrozen = true;
		GameObject.FindGameObjectWithTag("ExpandSound").GetComponent(AudioSource).Play();
}

function OnTriggerExit2D(coll : Collider2D) {
	if (coll.name == "Luna") {

		if (zoomOnly) {
			cameraObj.zoomCamera(transitionEnterTime, zOut);
		} else {
			yield StartCoroutine("panCameraToLuna");
			cameraObj.isStatic = false;
		}
	}
}


function panCameraToLuna() {
	cameraObj.GetComponent(CameraBehavior).panCameraTo(Vector3(lunaObj.transform.position.x, lunaObj.transform.position.y, cameraZ), 0.2, zOut);
	GameObject.FindGameObjectWithTag("RestrainSound").GetComponent(AudioSource).Play();
}

