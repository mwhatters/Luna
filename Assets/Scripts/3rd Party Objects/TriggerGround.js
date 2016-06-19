#pragma strict

public var trigDoor : GameObject;
public var trigBall : GameObject;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject == trigBall) {
    coll.gameObject.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;

    var animatorBallObj = coll.gameObject.GetComponent(Animator);
    if (animatorBallObj != null) {
      animatorBallObj.Stop();
    }

    Destroy(trigDoor);
    GetComponent(Animator).Stop();
    Sounds.use.PlaySoundByTag("GrabKeySound");
  }
}
