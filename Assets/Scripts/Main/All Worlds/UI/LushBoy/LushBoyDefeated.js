#pragma strict

public var whiteBackdrop : GameObject;
public var Text1 : GameObject;
private var wasHit : boolean = false;

function Start() {
  Text1 = GameObject.Find("PostT1");
}

function OnCollisionEnter2D(coll : Collision2D) {
  var tag : String = coll.gameObject.tag;
  if (tag == "TheGuy" && !wasHit) {
    Destroy(GameObject.Find("BackgroundMusic"));
    Destroy(GameObject.Find("IntroMusic"));
    Destroy(GameObject.Find("Fire"));

    wasHit = false;
    LushBoyDie();
  }
}

function LushBoyDie() {
  Sounds.use.PlaySoundByName("Refuge");
  SceneHelper.use.FadeInImage("white", 0.008);
  yield WaitForSeconds(7);
  SceneHelper.use.ShowAndHideText(Text1, 3);
}
