#pragma strict

public var trigDoor : GameObject;
public var trigBall : GameObject;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject == trigBall) {
    coll.gameObject.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;

    var BallObj = coll.gameObject;
    if (BallObj.GetComponent(Animator) != null) {
      BallObj.GetComponent(Animator).Stop();
      BallObj.tag = "NiceBox";
      BallObj.GetComponent(SpriteRenderer).color = Color.grey;
    }

    Destroy(trigDoor);
    GetComponent(Animator).Stop();
    Sounds.use.PlaySoundByTag("GrabKeySound");
  }
}
