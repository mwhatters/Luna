#pragma strict

private static var scenePlayed : boolean = false;

function Start () {
  if (scenePlayed) {
    var seenGround = GameObject.Find("InvisibleGround");
    var seenChildren : Component[] = seenGround.GetComponentsInChildren(Transform);
    for (var child : Transform in seenChildren) {
      if (child == seenGround.transform) { continue; }
      child.gameObject.GetComponent(SpriteRenderer).color = Color.black;
    }
    return;
  } else {
    scenePlayed = true;
  }

  LunaController.use.FreezeLunaAndAnimation();
  LunaController.use.FreezeOtherLunas();
  yield WaitForSeconds(2);
  SceneHelper.use.FadeTo("firstBox", 0.04, Color.black);
  Sounds.use.PlaySoundByName("refuge");

  yield WaitForSeconds(5);

  var iGround = GameObject.Find("InvisibleGround");
  var iChildren : Component[] = iGround.GetComponentsInChildren(Transform);
  for (var child : Transform in iChildren) {
    if (child == iGround.transform) { continue; }
    if (child.name == "FDoor1" ||
        child.name == "FDoor2" ||
        child.name == "FDoor3" ||
        child.name == "FDoor4" ||
        child.name == "FDoor5" ||
        child.name == "FDoor6") {
      SceneHelper.use.FadeObjTo(child.gameObject, 0.03, Color.grey);
    } else {
      SceneHelper.use.FadeObjTo(child.gameObject, 0.03, Color.black);
    }
  }

  yield WaitForSeconds(7);
  LunaController.use.Unfreeze();
  LunaController.use.UnfreezeOtherLunas();
}
