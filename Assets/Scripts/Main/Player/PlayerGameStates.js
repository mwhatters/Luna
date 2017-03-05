#pragma strict
import UnityEngine.SceneManagement;

public var killMusicOnDeath = false;
public var isDead = false;
public var hasWon = false;
public var keysFound : GameObject[];
enum DeathType { Void, Explode, Laser }

private var rotaterRate : float = 0.5;
private var nextRotater : float = 0.0;

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
        if (gravityState.cameraRotationEnabled) {
          Sounds.use.ConstructOneOffSound("HitGround", transform.position);
        }
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

  if (tag == "RotaterR" && gravityState.canRotateGravity() && canUseRotater()) {
      gravityState.adjustGravityRight();
      rotateWorld(gravityState, 90);
  }

  if (tag == "RotaterL" && gravityState.canRotateGravity() && canUseRotater()) {
      gravityState.adjustGravityLeft();
      rotateWorld(gravityState, -90);
  }

  if (tag == "Rotater180" && gravityState.canRotateGravity() && canUseRotater()) {
      gravityState.adjustGravity180();
      rotateWorld(gravityState, 180);
  }

  if (tag == "Rotater-180" && gravityState.canRotateGravity() && canUseRotater()) {
      gravityState.adjustGravity180();
      rotateWorld(gravityState, -180);
  }
}

function rotateWorld(gravityState : MainGravity, degrees : float) {
  gravityState.rotatePlayerAndObjects(degrees);
  gravityState.rotateCameraInDegrees(degrees);
  gravityState.setWorldGravityShift();

  nextRotater = Time.time + rotaterRate + 0.01;
}

function canUseRotater() {
  return (Time.time > nextRotater + 0.001);
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
  doExplosionDeath();
  yield WaitForSeconds(2.0);
  GameObject.Find("TimerText").GetComponent(Timer).isLevelTransition = false;
  SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}

function doExplosionDeath() {
  Sounds.use.ConstructOneOffSound("Die", transform.position);
}

function doVoidDeath() {

}

function doLaserDeath() {

}

function removeLuna() {
  Destroy(GetComponent(SpriteRenderer));
  Destroy(GetComponent(PolygonCollider2D));
}

function Remove(tag : String) {
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(SpriteRenderer));
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(BoxCollider2D));
}
