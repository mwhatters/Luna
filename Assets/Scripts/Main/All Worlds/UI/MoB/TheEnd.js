#pragma strict

private var luna : GameObject;
private var gravity : MainGravity;
private var camObj : GameObject;
private var triggered : boolean = false;

var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text5 : GameObject;
var Text6 : GameObject;
var Text7 : GameObject;
var Text8 : GameObject;
var Text9 : GameObject;
var Text10 : GameObject;

function Start () {
  luna = GameObject.Find("Luna");
  gravity = luna.GetComponent(MainGravity);
  camObj = GameObject.Find("Camera");

  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");
  Text4 = GameObject.Find("Text4");
  Text5 = GameObject.Find("Text5");
  Text6 = GameObject.Find("Text6");
  Text7 = GameObject.Find("Text7");
  Text8 = GameObject.Find("Text8");
  Text9 = GameObject.Find("Text9");
  Text10 = GameObject.Find("Text10");
}

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;

    GameObject.Find("Camera").GetComponent(CheckpointTracker).checkPointPos = Vector3(0,0,0);

    Sounds.use.PlaySoundByName("arrival");
    StartCoroutine("HandleOutroMusic");

    luna.GetComponent(SpriteRenderer).color = Color.white;
    GameObject.Find("white").GetComponent(SpriteRenderer).color = Color.white;

    yield WaitForSeconds(8);

    SceneHelper.use.ShowAndHideText(Text2, 3);
    yield WaitForSeconds(5);

    var god = GameObject.Find("god");
    var godPieces : Component[] = god.GetComponentsInChildren(Transform);
    for (var child : Transform in godPieces) {
      if (child == god.transform) { continue; }
      SceneHelper.use.FadeTo(child.name, 0.05, Color.white);
    }

    yield WaitForSeconds(5);
    yield SceneHelper.use.ShowAndHideText(Text3, 3);
    yield SceneHelper.use.ShowAndHideText(Text4, 3);
    yield SceneHelper.use.ShowAndHideText(Text5, 3);
    yield SceneHelper.use.ShowAndHideText(Text6, 3);
    yield SceneHelper.use.ShowAndHideText(Text7, 3);
    yield SceneHelper.use.ShowAndHideText(Text8, 3);
    SceneHelper.use.ShowAndHideText(Text9, 3);

    yield WaitForSeconds(7);
    yield SceneHelper.use.ShowAndHideText(Text10, 3);

    // yield WaitForSeconds(3.5);

    Sounds.use.PlaySoundByName("crack");
    for (var child : Transform in godPieces) {
      if (child == god.transform) { continue; }
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;
    }

    var godKiller = GameObject.Find("godkiller");
    godKiller.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;

    yield WaitForSeconds(0.5);
    Destroy(GameObject.Find("godwhite"));

    yield WaitForSeconds(3);
    Sounds.use.PlaySoundByName("explode");

    yield WaitForSeconds(3);
    SceneHelper.use.FadeInImage("endportal", 0.002);

    yield WaitForSeconds(2);

    var steam = GameObject.Find("SteamCustomizer");
    if (steam) {
      steam.SendMessage("UnlockAchive", "DREAMS_END_COMPLETE");
    }

    yield WaitForSeconds(2);
    for (var child : Transform in godPieces) {
      if (child == god.transform) { continue; }
      SceneHelper.use.FadeTo(child.name, 0.008, Color.clear);
    }

    yield WaitForSeconds(19);

    SceneManager.LoadScene("Credits");
  }
}

function HandleOutroMusic() {
  Sounds.use.EnableSoundByName("IntroMusic", 0.84);
  yield WaitForSeconds(78.710);
  Sounds.use.EnableSoundByName("BackgroundMusic", 0.84);
}
