#pragma strict
import UnityEngine.SceneManagement;

public var killMusicOnDeath = false;
public var isDead = false;
public var hasWon = false;
public var keysFound : GameObject[];

function Update() {
    if (isDead || hasWon) {
      var gravScript = GetComponent(MainGravity);
      gravScript.setNoMovements();
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

  for (var item : String in ["Ground", "StubbornGround", "StubbornGroundReverse", "NiceBox", "BlackHoleBox", "Door", "RotaterR", "RotaterL", "Rotater180", "Rotater-180"]) {
    if (tag == item) {
      yield WaitForSeconds(0.001); // hacky
      if (gravityState.touchingGround == true) {
        GetComponent(MainGravity).numJumps = 0;
        Sounds.use.PlaySoundByTag("HitGround");
      }
    }
  }

  //Death
  for (var item : String in ["Death", "DeathRock", "DeathBall", "ReverseDeathObject", "BurdenBall", "LeftieDeathObject", "RightieDeathObject"]) {
    if (tag == item) {
      Die();
    }
  }

  if (coll.gameObject.CompareTag("VictoryPortal")) {
    hasWon = true;
  }

  if (tag == "RotaterR" && gravityState.canRotateGravity()) {
    gravityState.adjustGravityRight();
    gravityState.rotatePlayerAndObjects(90);
    gravityState.rotateCameraInDegrees(90);
    gravityState.setWorldGravityShift();
  }

  if (tag == "RotaterL" && gravityState.canRotateGravity()) {
    gravityState.adjustGravityLeft();
    gravityState.rotatePlayerAndObjects(-90);
    gravityState.rotateCameraInDegrees(-90);
    gravityState.setWorldGravityShift();
  }

  if (tag == "Rotater180" && gravityState.canRotateGravity()) {
    gravityState.adjustGravity180();
    gravityState.rotatePlayerAndObjects(180);
    gravityState.rotateCameraInDegrees(180);
    gravityState.setWorldGravityShift();
  }

  if (tag == "Rotater-180" && gravityState.canRotateGravity()) {
    gravityState.adjustGravity180();
    gravityState.rotatePlayerAndObjects(-180);
    gravityState.rotateCameraInDegrees(-180);
    gravityState.setWorldGravityShift();
  }


}

// EndGame & Meta

function Die() {
  if (hasWon == true) { return; }
  if (killMusicOnDeath) {
    Destroy(GameObject.Find("BackgroundMusic"));
    Destroy(GameObject.Find("IntroMusic"));
  }

  isDead = true;
  removeLuna();
  Sounds.use.PlaySoundByTag("DieSound");
  yield WaitForSeconds(3.0);
  GameObject.Find("TimerText").GetComponent(Timer).isLevelTransition = false;
  SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}

function removeLuna() {
  Destroy(GetComponent(SpriteRenderer));
  Destroy(GetComponent(PolygonCollider2D));
}

function Remove(tag : String) {
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(SpriteRenderer));
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(BoxCollider2D));
}
