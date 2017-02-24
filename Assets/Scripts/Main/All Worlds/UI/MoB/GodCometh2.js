#pragma strict

public var triggered : boolean = false;
public var frictionMaterial : PhysicsMaterial2D;

function OnTriggerEnter2D(coll : Collider2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    triggered = true;
    Sounds.use.FadeOut("DrowningAtSea", 0.2, 0.0);
    Sounds.use.PlaySoundByName("arrival");
    GameObject.Find("godboy2").GetComponent(SpriteRenderer).color = Color.black;

    var clingers = GameObject.Find("Clingers");
    var clingerKids : Component[] = clingers.GetComponentsInChildren(Transform);
    for (var child : Transform in clingerKids) {
      if (child == clingers.transform) { continue; }
      child.GetComponent(Clinger).active = false;
    }

    yield WaitForSeconds(4);

    LunaController.use.Unfreeze();
    LunaController.use.enableCameraRotation();

    GameObject.Find("DrowningAtSea").GetComponent(AudioSource).pitch = 0.91;
    Sounds.use.FadeIn("DrowningAtSea", 0.002, 0.5);

    var lasers = GameObject.Find("LaserBoxes");
    var laserKids : Component[] = lasers.GetComponentsInChildren(Transform);
    for (var child : Transform in laserKids) {
      if (child == lasers.transform) { continue; }
      if (child.GetComponent(GravLaser)) { continue; }
      child.GetComponent(Rigidbody2D).velocity.x = -13;
    }

    var iGround = GameObject.Find("freeboxes2");
    var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
    for (var child : Transform in iChildren) {
      if (child == iGround.transform) { continue; }
      child.GetComponent(BoxCollider2D).sharedMaterial = frictionMaterial;
      child.gameObject.AddComponent(Rigidbody2D);
      child.GetComponent(Rigidbody2D).gravityScale = 0;
    }
  }
}
