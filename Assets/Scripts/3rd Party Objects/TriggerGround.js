#pragma strict

public var trigDoor : GameObject;
public var trigBall : GameObject;

public var multipleObjects : boolean = false;
public var freezeTrigger : boolean = true;
public var trigObjs : GameObject[];

private var triggered : boolean = false;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject == trigBall && !triggered) {
    if (freezeTrigger) {
      coll.gameObject.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;
      var BallObj = coll.gameObject;
      if (BallObj.GetComponent(Animator) != null) {
        BallObj.GetComponent(Animator).Stop();
        BallObj.tag = "NiceBox";
        BallObj.GetComponent(SpriteRenderer).color = Color.grey;
      }
    }

    if (!multipleObjects) {
      Destroy(trigDoor);
    } else {
      for (var obj in trigObjs) {
        Destroy(obj);
      }
    }

    GetComponent(Animator).Stop();
    Sounds.use.PlaySoundByTag("GrabKeySound");
    triggered = true;
  }
}
