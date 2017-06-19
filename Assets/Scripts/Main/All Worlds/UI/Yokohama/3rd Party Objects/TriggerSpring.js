#pragma strict

public var trigDoor : GameObject;
private var triggered : boolean = false;

public var triggerSound : String = "GrabKey";
public var stopAnimation : boolean = true;

public var makeSpringInvisible : boolean = false;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    handleDoor();
  }
}

function OnTriggerEnter2D(coll : Collider2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    handleDoor();

    if (makeSpringInvisible) {
      var FadeImg = this.GetComponent(SpriteRenderer);
      Debug.Log(FadeImg);
      while (FadeImg.color.a > 0.001) {
          FadeImg.color.a -= 0.01;
          yield;
      }
    }

  }
}

function handleDoor() {
  Destroy(trigDoor);
  if (stopAnimation) { GetComponent(Animator).StopPlayback(); }
  Sounds.use.PlaySoundByName(triggerSound);
  triggered = true;
}
