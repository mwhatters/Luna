#pragma strict

private var darkRed : Color;

function Start () {
  var evilScene = GameObject.Find("PrimeLuna2").GetComponent(PrimeLunaEnd);
  var camObj = GameObject.Find("Camera");

  darkRed.a = 5;
  darkRed.r = 0.588;
  darkRed.b = 0;
  darkRed.g = 0;

  if (evilScene.evilHasBegun) {
    camObj.GetComponent(Camera).backgroundColor = darkRed;
  }
}
