#pragma strict

static var use : LunaController;
private static var luna : GameObject;

function Awake () {
	if (use) {
		return;
	}
	use = this;
  luna = GameObject.Find("Luna");
}

function Freeze() {
  luna.GetComponent(MainGravity).canMove = false;
  luna.GetComponent(MainGravity).canRotate = false;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;
}

function FreezeLunaAndAnimation() {
	Freeze();
	luna.GetComponent(LunaAnimation).forceIdle = true;
}

function Unfreeze() {
  luna.GetComponent(MainGravity).canMove = true;
  luna.GetComponent(MainGravity).canRotate = true;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
	luna.GetComponent(LunaAnimation).forceIdle = false;
}

function FreezeOtherLunas() {
	var lunas = GameObject.FindGameObjectsWithTag("OtherLuna");
	for (var otherLuna in lunas) {
		otherLuna.GetComponent(MainGravity).canMove = false;
		otherLuna.GetComponent(MainGravity).canRotate = false;
		otherLuna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;
	}
}

function UnfreezeOtherLunas() {
	var lunas = GameObject.FindGameObjectsWithTag("OtherLuna");
	for (var otherLuna in lunas) {
		otherLuna.GetComponent(MainGravity).canMove = true;
	  otherLuna.GetComponent(MainGravity).canRotate = true;
	  otherLuna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
	  otherLuna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
		otherLuna.GetComponent(LunaAnimation).forceIdle = false;
	}
}


function enableCameraRotation() {
	luna.GetComponent(MainGravity).cameraRotationEnabled = true;
}
