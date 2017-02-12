#pragma strict


function Awake() {
}

function Start () {
  LunaController.use.FreezeLunaAndAnimation();
  yield WaitForSeconds(2);
  SceneHelper.use.FadeTo("firstBox", 0.04, Color.black);
  Sounds.use.PlaySoundByName("refuge");

  yield WaitForSeconds(5);

  var iGround = GameObject.Find("InvisibleGround");
  var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
  for (var child : Transform in iChildren) {
    if (child == iGround.transform) { continue; }
    SceneHelper.use.FadeTo(child.name, 0.03, Color.black);
  }

  yield WaitForSeconds(7);
  LunaController.use.Unfreeze();
}
