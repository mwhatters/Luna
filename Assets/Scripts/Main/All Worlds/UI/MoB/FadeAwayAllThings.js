#pragma strict

private var luna : GameObject;
private var gravity : MainGravity;
private var camObj : GameObject;


var Text1 : GameObject;


private var triggered : boolean = false;

function Start () {
  luna = GameObject.Find("Luna");
  gravity = luna.GetComponent(MainGravity);
  camObj = GameObject.Find("Camera");

  Text1 = GameObject.Find("Text1");
}

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;

    gravity.cameraRotationEnabled = false;
    Sounds.use.FadeOut("DrowningAtSea", 0.0015, 0.0);
    camObj.GetComponent(CameraBehavior).FadeToColor(Color.black, 0.011);

    yield WaitForSeconds(7);

    SceneHelper.use.ShowAndHideText(Text1, 10);
  }
}
