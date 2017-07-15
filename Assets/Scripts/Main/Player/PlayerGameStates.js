#pragma strict
import UnityEngine.SceneManagement;

public var killMusicOnDeath = false;
public var isDead = false;
public var invincible = false;
public var hasWon = false;
public var keysFound : GameObject[];
enum DeathType { Void, Explode, Laser }

private var rotaterRate : float = 0.5;
private var nextRotater : float = 0.0;

public var deadLuna : GameObject;

function Start() {
}

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

  var collidedgameObject = coll.gameObject;
  var tag : String = collidedgameObject.tag;
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
      var colliderRigidBody = collidedgameObject.GetComponent(Rigidbody2D);
      if (colliderRigidBody) {
        colliderRigidBody.velocity = coll.relativeVelocity.normalized;
      }

      Die();
    }
  }

  if (collidedgameObject && collidedgameObject.CompareTag("VictoryPortal")) {
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
  if (hasWon == true || isDead == true || invincible == true) { return; }
  if (killMusicOnDeath) {
    Destroy(GameObject.Find("BackgroundMusic"));
    Destroy(GameObject.Find("IntroMusic"));
  }

  isDead = true;
  removeLuna();
  StartCoroutine("doExplosionDeath");
  yield WaitForSeconds(2.0);
  GameObject.Find("TimerText").GetComponent(Timer).isLevelTransition = false;
  SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
}

function doExplosionDeath() {
  Sounds.use.ConstructOneOffSound("Die", transform.position);
  var dlContainer : GameObject = Instantiate(deadLuna, Vector3(transform.position.x, transform.position.y, 0), Quaternion.identity);
  dlContainer.transform.localEulerAngles = transform.localEulerAngles;

  var thisRigidbody : Rigidbody2D = GetComponent(Rigidbody2D);

  if (dlContainer.name == "DeadLuna(Clone)") {
    var dlChildren : Component[] = dlContainer.GetComponentsInChildren(Rigidbody2D);
    for (var block : Rigidbody2D in dlChildren) {
      block.velocity = Vector3(Random.value * 10.0, Random.value * 10.0, 0);
      yield WaitForSeconds(0.000001);
    }
  }
}

function doVoidDeath() {

}

function doLaserDeath() {

}

function removeLuna() {
  Destroy(GetComponent(SpriteRenderer));
  this.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;
  this.gameObject.layer = 17;
}

function Remove(tag : String) {
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(SpriteRenderer));
  Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(BoxCollider2D));
}
