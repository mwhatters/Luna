#pragma strict

public var triggered : boolean = false;
public var frictionMaterial : PhysicsMaterial2D;

function OnTriggerEnter2D(coll : Collider2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;
    Sounds.use.FadeOut("DrowningAtSea", 0.2, 0.0);
    GameObject.Find("arrival").GetComponent(AudioSource).pitch = 0.99;
    Sounds.use.PlaySoundByName("arrival");
    GameObject.Find("godboy3").GetComponent(SpriteRenderer).color = Color.red;

    var lunas = GameObject.Find("Lunas");
    if (!lunas) { Debug.Log("hey"); } else {
      var otherLunas : Component[] = lunas.GetComponentsInChildren(Transform);
      for (var otherLuna : Transform in otherLunas) {
        Destroy(otherLuna.gameObject);
      }
    }

    yield WaitForSeconds(4);

    LunaController.use.Unfreeze();
    LunaController.use.enableCameraRotation();

    GameObject.Find("DrowningAtSea").GetComponent(AudioSource).pitch = 0.70;
    Sounds.use.FadeIn("DrowningAtSea", 0.002, 0.5);

    var clingers = GameObject.Find("ClingersR3");
    var clingerKids : Component[] = clingers.GetComponentsInChildren(Transform);
    for (var child : Transform in clingerKids) {
      if (child == clingers.transform) { continue; }
      child.GetComponent(Clinger).active = true;
    }

    var iGround = GameObject.Find("freeboxes3");
    var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
    for (var child : Transform in iChildren) {
      if (child == iGround.transform) { continue; }
      child.GetComponent(BoxCollider2D).sharedMaterial = frictionMaterial;
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;
    }
  }
}
