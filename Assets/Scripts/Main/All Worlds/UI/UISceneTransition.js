#pragma strict

public var exitTransition : GameObject;
public var entryTransition : GameObject;


function Start() {
  if (entryTransition == null) {
    entryTransition = null;
  } else {
    PortalEnterTransition();
  }
}

function PortalEnterTransition() {
  var transitionEnter = Instantiate(entryTransition, Vector3(0,0,0), Quaternion.identity);
  transitionEnter.transform.SetParent(gameObject.transform.parent, false);
  yield WaitForSeconds(0.3);
  FadeToClear(transitionEnter);
}

function PortalExitTransition() {
  var transitionExit = Instantiate(exitTransition, Vector3(0,0,0), Quaternion.identity);
  transitionExit.transform.SetParent(gameObject.transform.parent, false);
}


function FadeToClear(transitionEnter : GameObject) {
  var img = transitionEnter.GetComponent(Image);
  while (img.color.a > 0.02) {
    img.color = Color.Lerp(img.color, Color.clear, 0.5 * 0.3);
    yield WaitForSeconds(0.1);
  }
  img.color.a = 0.0;
}
