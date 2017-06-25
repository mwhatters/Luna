#pragma strict

var Text1 : GameObject;
var triggered : boolean = false;

function Start () {
	Text1 = GameObject.Find("Text1");
}

function OnTriggerEnter2D(coll : Collider2D) {

    if (coll.name == "Luna" && !triggered) {
			triggered = true;
			SceneHelper.use.ShowAndHideText(Text1, 7);
		}

	}
