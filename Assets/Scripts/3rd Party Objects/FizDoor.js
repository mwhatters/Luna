#pragma strict

public var freezeOnExit : boolean = false;
private var fizDoor : Transform;

function Start() {
  fizDoor = GetComponent(Transform).parent;
}

function OnTriggerExit2D(coll : Collider2D) {
  if (coll.gameObject.tag == "TheGuy" && freezeOnExit) {
    StartCoroutine("disableAnimation");
    this.GetComponent(BoxCollider2D).isTrigger = false;
    this.tag = "Ground";
  }
}


function disableAnimation() {
  var animatorObject = fizDoor.GetComponent(Animator);
  var colorObject = fizDoor.GetComponent(SpriteRenderer);
  var colorTone : float = 1;
  Debug.Log(fizDoor.GetComponent(SpriteRenderer).color);

  while (animatorObject.speed > 0) {
    colorTone -= 0.01;
    colorObject.color = new Color(colorTone, colorTone, 1, 1);
    animatorObject.speed -= 0.01;
    yield WaitForSeconds(0.01);
  }

  // fizDoor.GetComponent(Animator).enabled = false;
}
