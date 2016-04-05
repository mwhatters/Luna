#pragma strict

public var exitTransition : GameObject;

function PortalExitTransition() {
  var transition = Instantiate(exitTransition, GetComponent(RectTransform).transform.position, Quaternion.identity);
  transition.transform.parent = gameObject.transform.parent;
}
