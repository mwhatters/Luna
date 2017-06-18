#pragma strict
private var entered = false;
public var No : GameObject;

function OnTriggerEnter2D(coll : Collider2D) {
    if (coll.name == "Luna" && entered == false) {
    Sounds.use.PlaySoundByName("LushFade");
    SceneHelper.use.ShowAndHideText(No, 3);

        GameObject.Find("LavaRight").GetComponent(Lava).active = true;
        GameObject.Find("LavaDown").GetComponent(Lava).active = true;
        GameObject.Find("LavaLeft").GetComponent(Lava).active = true;
    entered = true;
  }
}
