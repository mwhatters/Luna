#pragma strict
import UnityEngine.SceneManagement;

public var isDead = false;
public var hasWon = false;
public var keysFound : GameObject[];

function Update() {
  	if (isDead || hasWon) {
      GetComponent(MainGravity).setNoMovements();
      return false;
    } else {
      return true;
    }
}

// Collision

function OnCollisionEnter2D (coll : Collision2D) {

	var tag : String = coll.gameObject.tag;
  var gravityState = GetComponent(MainGravity);



	//Jump
	if (ArrayUtility.Contains(["Ground", "NiceBox", "BlackHoleBox", "RotaterR", "RotaterL","ShifterL", "ShifterR", "ShifterD", "ShifterU"], tag)) {
			GetComponent(MainGravity).numJumps = 0;
	}

	//Death
	if (ArrayUtility.Contains(["Death", "DeathRock", "DeathBall", "ReverseDeathObject"], tag)) {
		Die();
	}

	if (coll.gameObject.CompareTag("VictoryPortal")) {
		removeLuna();
		Win();
	}

	if (tag == "RotaterR" && gravityState.canRotateGravity()) {
		gravityState.adjustGravityRight();
    gravityState.rotatePlayerAndObjects(90);
		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateRight(gravityState.rotateRate);
		playSound("RotateGravitySound");
	}

	if (tag == "RotaterL" && gravityState.canRotateGravity()) {
		gravityState.adjustGravityLeft();
    gravityState.rotatePlayerAndObjects(-90);

		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateLeft(gravityState.rotateRate);
		playSound("RotateGravitySound");
	}

	if (tag == "ShifterU") {
    gravityState.gravitySettings = "reverse";
		gravityState.setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterD") {
		gravityState.gravitySettings = "normal";
		gravityState.setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterL") {
		gravityState.gravitySettings = "left shift";
		gravityState.setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterR") {
		gravityState.gravitySettings = "right shift";
		gravityState.setWorldGravityShift();
		playSound("ShiftSound");
	}
}


// EndGame & Meta

function Die() {
	if (hasWon == true) { return; }

	isDead = true;
	removeLuna();
	playSound("DieSound");
	yield WaitForSeconds(3.0);
	SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}

function removeLuna() {
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(PolygonCollider2D));
}

function Win() {
	hasWon = true;
	playSound("WinSound");
	yield WaitForSeconds(3.0);
}

function playSound(tag : String) {
	GameObject.FindGameObjectWithTag(tag).GetComponent(AudioSource).Play();
}

function Remove(tag : String) {
	Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(SpriteRenderer));
	Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(BoxCollider2D));
}
