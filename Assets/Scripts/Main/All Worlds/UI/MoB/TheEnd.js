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

    SceneHelper.use.ShowAndHideText(Text3, 3);
    yield WaitForSeconds(5);

    SceneManager.LoadScene("Credits");


  }
}
