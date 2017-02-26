#pragma strict

public var camScope = 16;
public var staticPoint : Vector3;
public var isStatic : boolean;
private var lunaObj : GameObject;

public var shaking : boolean = false;
private var lastPositionX : int;
private var lastPositionY : int;

public var dynamicShaking : boolean = false;
private var lastLunaPositionX : int;
private var lastLunaPositionY : int;

private var pixelToUnits : float = 40.0;

function Start () {
	lunaObj = GameObject.Find("Luna");
}

function Update() {
	if (!staticCamera()) {
		transform.position.x = lunaObj.transform.position.x;
		transform.position.y = lunaObj.transform.position.y;
	}

	// TODO: Check behavior here
	if (shaking) {
		if (isStatic) {
			StaticShake();
		} else {
			DynamicShake();
		}
	}
}

function rotate(degrees : float, rate : float) {
	MoveObject.use.Rotation(transform, Vector3.forward * degrees, rate);
}

function staticCamera() {
	return isStatic == true;
}

function StaticShake() {
	if (lastPositionY == 0) {
		lastPositionY = transform.position.y;
	} else if (lastPositionY == transform.position.y) {
		transform.position.y += Random.value;
		transform.position.y -= Random.value;
	} else {
		transform.position.y = lastPositionY;
	}

	if (lastPositionX == 0) {
		lastPositionX = transform.position.x;
	} else if (lastPositionX == transform.position.x) {
		transform.position.x += Random.value;
		transform.position.x -= Random.value;
	} else {
		transform.position.x = lastPositionX;
	}
}

function DynamicShake() {
	if (lastLunaPositionY == 0) {
		lastLunaPositionY = lunaObj.transform.position.y;
	} else if (lastLunaPositionY == lunaObj.transform.position.y) {
		transform.position.y += Random.value;
		transform.position.y -= Random.value;
		lastPositionY = lunaObj.transform.position.y;
	} else {
		lastPositionY = lunaObj.transform.position.y;
	}

	if (lastLunaPositionX == 0) {
		lastLunaPositionX = lunaObj.transform.position.x;
	} else if (lastLunaPositionX == lunaObj.transform.position.x) {
		transform.position.x += Random.value;
		transform.position.x -= Random.value;
		lastPositionX = lunaObj.transform.position.x;
	} else {
		lastPositionX = lunaObj.transform.position.x;
	}
}

function RoundToNearestPixel(unityUnits : float) {
 var valueInPixels : float = (unityUnits * pixelToUnits);
 valueInPixels = Mathf.Round(valueInPixels);
 var roundedUnityUnits : float = valueInPixels * (1 / pixelToUnits);
 return roundedUnityUnits;
}


function FadeToColor(targetColor : Color, rate : float) {
	var cam = GetComponent(Camera);
	var currentColour;
	var n = 0;

	while (n < 1000) {
		currentColour = Color.Lerp(cam.backgroundColor, targetColor, rate);
		cam.backgroundColor = currentColour;
		n++;
		yield;

		if (cam.backgroundColor == targetColor) {
			break;
		}
	}
}
