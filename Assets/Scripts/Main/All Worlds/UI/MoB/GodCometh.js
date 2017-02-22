#pragma strict

private var camObj : GameObject;
private var darkRed : Color;

public var frictionMaterial : PhysicsMaterial2D;

public var triggered : boolean = false;

function Start() {
  camObj = GameObject.Find("Camera");

  darkRed.a = 5;
  darkRed.r = 0.588;
  darkRed.b = 0;
  darkRed.g = 0;
}

function OnTriggerEnter2D(coll : Collider2D) {

  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;
    Sounds.use.PlaySoundByName("arrival");
    camObj.GetComponent(Camera).backgroundColor = darkRed;
    GameObject.Find("godboy transparent").GetComponent(SpriteRenderer).color = Color.black;

    var lunas = GameObject.Find("Lunas");
    var otherLunas : Component[] = lunas.GetComponentsInChildren(Transform);
    for (var otherLuna : Transform in otherLunas) {
      Destroy(otherLuna.gameObject);
    }

    FinalScene();

    yield WaitForSeconds(3);

    LunaController.use.Unfreeze();
    LunaController.use.enableCameraRotation();

    var iGround = GameObject.Find("freeboxes");
    var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
    for (var child : Transform in iChildren) {
      if (child == iGround.transform) { continue; }
      child.GetComponent(BoxCollider2D).sharedMaterial = frictionMaterial;
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;
    }

    var clingers = GameObject.Find("Clingers");
    var clingerKids : Component[] = clingers.GetComponentsInChildren(Transform);
    for (var child : Transform in clingerKids) {
      if (child == clingers.transform) { continue; }
      child.GetComponent(Clinger).active = true;
    }


    Sounds.use.FadeIn("DrowningAtSea", 0.002, 0.5);


    // var cps = GameObject.Find("ChangePoints");
    // cps.transform.position.x = 999999999;
    // cps.transform.position.y = 999999999;

  }
}


function FinalScene() {

}
