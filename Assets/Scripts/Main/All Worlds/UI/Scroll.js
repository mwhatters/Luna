#pragma strict

public var ES : GameObject;

function Update () {
  if (Input.GetKeyDown(KeyCode.UpArrow)) {
    UpdateScrollToSelected(-20);
  }

  if (Input.GetKeyDown(KeyCode.DownArrow)) {
    UpdateScrollToSelected(20);
  }
}

function UpdateScrollToSelected(num : int) {
  var selected  =  EventSystems.EventSystem.current.currentSelectedGameObject;
  if (selected.transform.parent.transform.parent == this.transform) {
    selected.transform.parent.transform.position.y += num;
  }
}
