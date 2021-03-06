﻿#pragma strict

public var freezeOnExit : boolean = false;
private var fizDoor : Transform;

enum exitDirection { Down, Left, Right, Up }
public var exitFrom = exitDirection.Left;

public var fadeToBlack : boolean = false;

function Start() {
  fizDoor = GetComponent(Transform).parent;
}

function OnTriggerExit2D(coll : Collider2D) {
  if (coll.gameObject.CompareTag("TheGuy") && freezeOnExit && exitedInCorrectDirection(coll)) {
    StartCoroutine("disableAnimation");
    this.GetComponent(BoxCollider2D).isTrigger = false;
    fizDoor.GetComponent(BoxCollider2D).isTrigger = true;
    fizDoor.tag = "Ground";
    this.tag = "Ground";
    this.gameObject.layer = 0;
  }
}

function disableAnimation() {
  var animatorObject = fizDoor.GetComponent(Animator);
  var colorObject = fizDoor.GetComponent(SpriteRenderer);
  var colorTone : float = 1;

  var colorToneForA : float = colorObject.color.r;
  var colorToneForB : float = colorObject.color.b;
  var colorToneForC : float = colorObject.color.g;

  while (animatorObject.speed > 0) {
    colorTone -= 0.01;
    if (fadeToBlack) {
      colorToneForA -= 0.01;
      colorToneForB -= 0.01;
      colorToneForC -= 0.01;
      colorObject.color = new Color(colorToneForA, colorToneForB, colorToneForC, 1);
    } else {
      colorObject.color = new Color(colorTone, colorTone, 1, 1);
    }
    animatorObject.speed -= 0.01;
    yield WaitForSeconds(0.01);
  }
}

function exitedInCorrectDirection(coll : Collider2D) {
  var correct : boolean = false;
  switch (exitFrom)
  {
    case exitDirection.Down:
      if (coll.bounds.center.y < this.transform.position.y) { correct = true; }
      break;
    case exitDirection.Up:
      if (coll.bounds.center.y > this.transform.position.y) { correct = true; }
      break;
    case exitDirection.Right:
      if (coll.bounds.center.x > this.transform.position.x) { correct = true; }
      break;
    case exitDirection.Left:
      if (coll.bounds.center.x < this.transform.position.x) { correct = true; }
      break;
  }
  return correct;
}
