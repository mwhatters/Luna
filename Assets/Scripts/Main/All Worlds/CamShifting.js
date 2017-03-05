﻿#pragma strict

private var cameraObj : CameraBehavior;
private var lunaObj : GameObject;

private var boxesUnfrozen = false;
public var freezeObjectsOnExit : boolean = false;
public var freezeZRotations : boolean = false;
public var freezeXMovement : boolean = false;
public var freezeYMovement : boolean = false;
public var objectsList : GameObject[];

public var fader : GameObject;
private var hasFaded : boolean = false;
public var hasFader : boolean = false;

public var x : float;
public var y : float;
public var zIn : float;
public var zOut : float;
public var transitionEnterTime : float = 1;
public var transitionExitTime : float = 0.5;
public var zoomOnly : boolean = false;
public var playSoundOnTransition : boolean = true;

private var isOrthographic : boolean = true;

private var currentlyTransitioning = false;

public var explanatoryText : GameObject;

function Start () {
	cameraObj = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
	lunaObj = GameObject.FindGameObjectWithTag("TheGuy");
	isOrthographic = cameraObj.GetComponent(Camera).orthographic;
	explanatoryText = explanatoryText;
}

function FreezeRotation() : RigidbodyConstraints2D {
	if (freezeZRotations) { return RigidbodyConstraints2D.FreezeRotation; } else { return; }
}

function FreezeX() : RigidbodyConstraints2D {
	if (freezeXMovement) { return RigidbodyConstraints2D.FreezePositionX; } else { return; }
}

function FreezeY() : RigidbodyConstraints2D {
	if (freezeYMovement) { return RigidbodyConstraints2D.FreezePositionY; } else { return; }
}

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name == "Luna") {
		if (playSoundOnTransition) { Sounds.use.PlaySoundByTag("ExpandSound"); }

		if (!boxesUnfrozen && objectsList != null) {
			for (var item in objectsList) {
				if (item.CompareTag("BurdenBall")) {
					item.GetComponent(Clinger).active = true;
				} else if (item.GetComponent(emitSound)) {
					item.GetComponent(emitSound).shouldEmitSound = true;
				} else {
					item.GetComponent(Rigidbody2D).constraints = (FreezeRotation() | FreezeX() | FreezeY());
				}

				var hasSound = item.GetComponent(BoxCollision);
				if (hasSound) { hasSound.canTriggerSound = true; }
			}
			boxesUnfrozen = true;
		}

		if (explanatoryText){
			explanatoryText.GetComponent(ExplanatoryText).turnedOff = false;
			explanatoryText.GetComponent(ExplanatoryText).revealUIText();
		}

		if (currentlyTransitioning) {
			StopCoroutine("panCameraToFollowLuna");
			StopCoroutine("zoomCameraExit");
		}

		if (!hasFaded && hasFader) {
			StartCoroutine(SceneHelper.use.FadeOutGameObj(fader, 0.01));
			hasFaded = true;
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
		if (playSoundOnTransition) { Sounds.use.PlaySoundByTag("RestrainSound"); }

		if (explanatoryText != null){
			explanatoryText.GetComponent(ExplanatoryText).turnedOff = true;
			explanatoryText.GetComponent(ExplanatoryText).removeUIText();
		}

		if (currentlyTransitioning) {
			StopCoroutine("panCameraToPoint");
			StopCoroutine("zoomCameraEnter");
		}

		if (freezeObjectsOnExit) {
			freezeObjects();
		}

		if (zoomOnly) {
			yield StartCoroutine("zoomCameraExit");
		} else {
			yield StartCoroutine("panCameraToFollowLuna");
			cameraObj.isStatic = false;
		}
	}
}

// enter static
function panCameraToPoint() {

	var cameraScope = cameraObj.GetComponent(Camera);
	var startPos = cameraObj.transform.position;
	var endPos = Vector3(x, y, startPos.z);
	var rate = 1.0/transitionEnterTime;
	var t = 0.0;

	currentlyTransitioning = true;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		cameraObj.transform.position = Vector3.Lerp(startPos, endPos, t);
		performCameraZoom(cameraScope, zIn, t);
		yield;
	}

	currentlyTransitioning = false;
}

// exit static
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
		endPos = Vector3(lunaObj.transform.position.x, lunaObj.transform.position.y, startPos.z);
		x = lunaObj.transform.position.x;
		y = lunaObj.transform.position.y;
		t += Time.deltaTime * rate;

		cameraObj.transform.position = Vector3.Lerp(startPos, endPos, t);
		performCameraZoom(cameraScope, zOut, t);
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
		performCameraZoom(cameraScope, zIn, t);
		yield;
	}

	currentlyTransitioning = false;
	// if (cameraScope.fieldOfView == zIn) { break; } -- this line was existing for some reason just in case this breaks
}


function zoomCameraExit() {
	var cameraScope = cameraObj.GetComponent(Camera);
	var rate = 1.0/transitionEnterTime;
	var t = 0.0;

	currentlyTransitioning = true;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		performCameraZoom(cameraScope, zOut, t);
		yield;
	}

	currentlyTransitioning = false;
}

// TODO: Need to figure out how to zoom a camera out over a longer time period
function performCameraZoom(cameraScope : Camera, endpoint : float, t : float) {
	if (isOrthographic) {
		cameraScope.orthographicSize = Mathf.Lerp(cameraScope.orthographicSize, endpoint, t);
	} else {
		cameraScope.fieldOfView = Mathf.Lerp(cameraScope.fieldOfView, endpoint, t);
	}
}

function freezeObjects() {
	boxesUnfrozen = false;
	for (var item in objectsList) {
		if (item.CompareTag("BurdenBall")) {
			item.GetComponent(Clinger).active = false;
		} else if (item.GetComponent(emitSound)) {
			item.GetComponent(emitSound).shouldEmitSound = false;
		} else {
			item.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;
		}

		var hasSound = item.GetComponent(BoxCollision);
		if (hasSound) { hasSound.canTriggerSound = false; }
	}
}
