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
public var transitionExitTime : float;

public var zoomOnly : boolean = false;


function Start () {
	cameraObj = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
	lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
}

function Update () {

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name == "Luna") { 

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
}

function OnTriggerExit2D(coll : Collider2D) {
	if (coll.name == "Luna") {

		if (zoomOnly) {
			cameraObj.zoomCamera(transitionEnterTime, zOut);
		} else {
			yield StartCoroutine("panCameraAndFollowLuna");
			cameraObj.isStatic = false;
		}
	}
}

function panCameraAndFollowLuna() {

	var camera = GameObject.FindGameObjectWithTag("MainCamera");
	var cameraScope = camera.GetComponent(Camera);
	var startPos = camera.transform.position;
	var endPos : Vector3;
	var x;
	var y;

	var rate = 1.0/transitionExitTime;
	var t = 0.0;

	while (t < 1.0) {

		endPos = Vector3(lunaObj.transform.position.x, lunaObj.transform.position.y, cameraZ);


		x = lunaObj.transform.position.x;
		y = lunaObj.transform.position.y;

		Debug.Log(x);

		t += Time.deltaTime * rate;
		camera.transform.position = Vector3.Lerp(startPos, endPos, t);
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, zOut, t);
		yield;
	}

	GameObject.FindGameObjectWithTag("RestrainSound").GetComponent(AudioSource).Play();


}
