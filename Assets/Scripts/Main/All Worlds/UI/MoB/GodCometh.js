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
    // camObj.GetComponent(CameraBehavior).shaking = true;
    Sounds.use.PlaySoundByName("fire");

    var iGround = GameObject.Find("InvisibleGround");
    var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
    for (var child : Transform in iChildren) {
      if (child == iGround.transform) { continue; }
      child.tag = "NiceBox";
      child.GetComponent(BoxCollider2D).sharedMaterial = frictionMaterial;
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;

    }

    // var gGround = GameObject.Find("Ground");
    // var gChildren : Component[] = gGround.GetComponentsInChildren(Transform);
    // for (var child : Transform in gChildren) {
    //   if (child == gGround.transform) { continue; }
    //   child.gameObject.AddComponent(Rigidbody2D);
    //   child.GetComponent(BoxCollider2D).sharedMaterial = frictionMaterial;
    //   child.tag = "NiceBox";
    //   child.GetComponent(Rigidbody2D).gravityScale = 0;
    // }

  }
}


function FinalScene() {

}
