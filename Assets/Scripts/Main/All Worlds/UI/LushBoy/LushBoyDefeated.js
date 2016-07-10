#pragma strict

public var whiteBackdrop : GameObject;
private var Text1 : GameObject;
private var Text2 : GameObject;
private var wasHit : boolean = false;

function Start() {
  Text1 = GameObject.Find("PostT1");
  Text2 = GameObject.Find("PostT2");
}

function OnCollisionEnter2D(coll : Collision2D) {
  var tag : String = coll.gameObject.tag;
  if (tag == "TheGuy" && !wasHit) {
    coll.gameObject.layer = 20;
    Destroy(GameObject.Find("BackgroundMusic"));
    Destroy(GameObject.Find("IntroMusic"));
    Destroy(GameObject.Find("Fire"));

    wasHit = true;
    LushBoyDie();
  }
}

function LushBoyDie() {

  Sounds.use.PlaySoundByName("Refuge");
  SceneHelper.use.FadeInImage("white", 0.008);
  yield WaitForSeconds(7);
  SceneHelper.use.ShowText(Text1);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowText(Text2);
  yield WaitForSeconds(7);
  GetComponent(SceneLoader).beginSceneTransition();
}
