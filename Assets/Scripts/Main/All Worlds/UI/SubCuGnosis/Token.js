#pragma strict

public var nextRound : String;
public var thisRound : String;
private var bossBattle : PureBoy;

function Start() {
  bossBattle = GameObject.Find("PureBoyStart").GetComponent(PureBoy);
}

function OnTriggerEnter2D (coll : Collider2D) {
	if (coll.gameObject.tag == "TheGuy") {
    bossBattle.fadeOutRound(thisRound);

    if (nextRound == "Round5") {
      Destroy(GameObject.Find("BackgroundMusic"));
      Destroy(GameObject.Find("IntroMusic"));
      Sounds.use.PlaySoundByName("Refuge");
    }

    yield WaitForSeconds(1);

    if (nextRound == "Round2") {
      bossBattle.StartRound2();
    } else if (nextRound == "Round3") {
      bossBattle.StartRound3();
    } else if (nextRound == "Round4") {
      bossBattle.StartRound4();
    } else if (nextRound == "Round5") {
      bossBattle.EndBattle();
    }
	}
}
