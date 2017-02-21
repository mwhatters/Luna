#pragma strict

private var triggered : boolean = false;

public var secretDoorToUnlock : GameObject;

function OnCollisionEnter2D(coll : Collision2D) {
  if (!triggered) {
    var tag : String = coll.gameObject.tag;
    if (tag == "OtherLuna") {
      triggered = true;
      Sounds.use.PlaySoundByName("woosh");
      SceneHelper.use.FadeOutGameObj(this.gameObject, 0.04);
      yield SceneHelper.use.FadeOutGameObj(coll.gameObject, 0.04);
      Destroy(coll.gameObject);
      Destroy(this.gameObject);

      if (secretDoorToUnlock) {
        Destroy(secretDoorToUnlock);
      }
    }


  }
}
