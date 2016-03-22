#pragma strict

private var cameraObj : CameraBehavior;
private var lunaObj : GameObject;

private var boxesUnfrozen = false;
public var objectsList : String;

public var cameraZ : int = -8;
public var y : float;
public var x : float;
public var zIn : float;
public var zOut : float;
public var transitionEnterTime : float = 1;
public var transitionExitTime : float = 0.5;
public var zoomOnly : boolean = false;

private var currentlyTransitioning = false;

function Start () {
	cameraObj = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
	lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name == "Luna") {
		Play("ExpandSound");

		if (!boxesUnfrozen && objectsList != "") {
			var objects = objectsList.Split(" "[0]);
			for (var box in objects) {
				var object = GameObject.Find(box);
				object.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
			}
			boxesUnfrozen = true;
		}

		if (currentlyTransitioning) {
			StopCoroutine("panCameraToFollowLuna");
			StopCoroutine("zoomCameraExit");
		}

		if (zoomOnly) {
			yield StartCoroutine("zoomCameraEnter");
		} else {
			cameraObj.isStatic = true;
			yield StartCoroutine("panCameraToPoint");
		}
	}
}

function OnTriggerExit2D(coll : Collider2D) {
	if (coll.name == "Luna") {
		Play("RestrainSound");

		if (currentlyTransitioning) {
			StopCoroutine("panCameraToPoint");
			StopCoroutine("zoomCameraEnter");
		}

		if (zoomOnly) {
			yield StartCoroutine("zoomCameraExit");
		} else {
			yield StartCoroutine("panCameraToFollowLuna");
			cameraObj.isStatic = false;
		}
	}
}

function panCameraToPoint() {

	var cameraScope = cameraObj.GetComponent(Camera);
	var startPos = cameraObj.transform.position;
	var endPos = Vector3(x, y, cameraZ);
	var rate = 1.0/transitionEnterTime;
	var t = 0.0;
	currentlyTransitioning = true;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		cameraObj.transform.position = Vector3.Lerp(startPos, endPos, t);
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, zIn, t);
		yield;
	}

	currentlyTransitioning = false;
}



function panCameraToFollowLuna() {
	var cameraScope = cameraObj.GetComponent(Camera);
	var startPos = cameraObj.transform.position;
	var endPos : Vector3;
	var x;
	var y;
	var rate = 1.0/transitionExitTime;
	var t = 0.0;
	currentlyTransitioning = true;

	while (t < 1.0) {
		endPos = Vector3(lunaObj.transform.position.x, lunaObj.transform.position.y, cameraZ);
		x = lunaObj.transform.position.x;
		y = lunaObj.transform.position.y;
		t += Time.deltaTime * rate;

		cameraObj.transform.position = Vector3.Lerp(startPos, endPos, t);
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, zOut, t);
		yield;
	}

	currentlyTransitioning = false;
}

function zoomCameraEnter() {
	var cameraScope = cameraObj.GetComponent(Camera);
	var rate = 1.0/transitionEnterTime;
	var t = 0.0;
	currentlyTransitioning = true;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, zIn, t);
		yield;
	}

	currentlyTransitioning = false;
}


function zoomCameraExit() {
	var cameraScope = cameraObj.GetComponent(Camera);
	var rate = 1.0/transitionEnterTime;
	var t = 0.0;
	currentlyTransitioning = true;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, zOut, t);
		yield;
	}

	currentlyTransitioning = false;
}

function Play(sound : String) {
	GameObject.FindGameObjectWithTag(sound).GetComponent(AudioSource).Play();
}
