#pragma strict

public var nextRound : String;
public var thisRound : String;
private var bossBattle : PureBoy;

function Start() {
  bossBattle = GameObject.Find("PureBoyStart").GetComponent(PureBoy);
}

function OnTriggerEnter2D (coll : Collider2D) {
	if (coll.gameObject.CompareTag("TheGuy")) {
    bossBattle.fadeOutRound(thisRound);

    if (nextRound == "Round5") {
      Destroy(GameObject.Find("BackgroundMusic"));
      Destroy(GameObject.Find("IntroMusic"));
      Sounds.use.PlaySoundByName("Refuge");

      var luna = GameObject.Find("Luna");
      var gravity = luna.GetComponent(MainGravity);

      if (gravity.gravityDirection == Direction.Down) {
        gravity.adjustGravityLeft();
        gravity.rotatePlayerAndObjects(-90);
        gravity.rotateCameraInDegrees(-90);
      } else if (gravity.gravityDirection == Direction.Up) {
        gravity.adjustGravityRight();
        gravity.rotatePlayerAndObjects(90);
        gravity.rotateCameraInDegrees(90);
      } else if (gravity.gravityDirection == Direction.Left) {
        // good, we want this
      } else if (gravity.gravityDirection == Direction.Right) {
        gravity.adjustGravity180();
        gravity.rotatePlayerAndObjects(180);
        gravity.rotateCameraInDegrees(180);
      }
    }

    if (nextRound == "Round2") {
      yield WaitForSeconds(1);
      bossBattle.StartRound2();
    } else if (nextRound == "Round3") {
      yield WaitForSeconds(1);
      bossBattle.StartRound3();
    } else if (nextRound == "Round4") {
      yield WaitForSeconds(1);
      bossBattle.StartRound4();
    } else if (nextRound == "Round5") {
      bossBattle.EndBattle();
    }
	}
}
