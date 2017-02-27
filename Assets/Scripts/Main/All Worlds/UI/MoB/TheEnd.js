#pragma strict

private var luna : GameObject;
private var gravity : MainGravity;
private var camObj : GameObject;

private var triggered : boolean = false;

var Text2 : GameObject;
var Text3 : GameObject;


function Start () {
  luna = GameObject.Find("Luna");
  gravity = luna.GetComponent(MainGravity);
  camObj = GameObject.Find("Camera");

  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");

}

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;

    Sounds.use.PlaySoundByName("arrival");
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
    SceneHelper.use.ShowAndHideText(Text3, 3);

    yield WaitForSeconds(5);

    for (var child : Transform in godPieces) {
      if (child == god.transform) { continue; }
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;
    }

    var godKiller = GameObject.Find("godkiller");
    godKiller.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;

    yield WaitForSeconds(0.5);
    Destroy(GameObject.Find("godwhite"));


    yield WaitForSeconds(15);

    SceneManager.LoadScene("Credits");
  }
}
