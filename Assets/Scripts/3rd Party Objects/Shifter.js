#pragma strict

enum shiftDirection { Down, Left, Right, Up }
public var shift = exitDirection.Down;

function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.gameObject.tag == "TheGuy") {

    var gravityState = coll.gameObject.GetComponent(MainGravity);
    var tag = this.gameObject.tag;

    if (shift == exitDirection.Up) {
      gravityState.gravityObjectDirection = ObjectDirection.Up;
      gravityState.setWorldGravityShift();
    }

    if (shift == exitDirection.Down) {
      gravityState.gravityObjectDirection = ObjectDirection.Down;
      gravityState.setWorldGravityShift();
    }

    if (shift == exitDirection.Left) {
      gravityState.gravityObjectDirection = ObjectDirection.Left;
      gravityState.setWorldGravityShift();
    }

    if (shift == exitDirection.Right) {
      gravityState.gravityObjectDirection = ObjectDirection.Right;
      gravityState.setWorldGravityShift();
    }

    Sounds.use.PlaySoundByTag("ShiftSound");
    adjustShifterColors(["ShifterL", "ShifterD", "ShifterR", "ShifterU"]);
  }

}

function adjustShifterColors(shifters : String[]) {
	for (var shifter : String in shifters) {
		var shiftObjects = GameObject.FindGameObjectsWithTag(shifter);
		for (var shiftObject in shiftObjects) {
      Debug.Log(this.shift);
			if (shiftObject.GetComponent(Shifter).shift == this.shift) {
        FadeShifterToYellow(shiftObject.name, 0.4);
      } else {
        FadeShifterToRed(shiftObject.name, 0.4);
      }
		}
	}
}

function FadeShifterToYellow(name, rate: float) {
	var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
	var a = 0;
	while (a < 10) {
		FadeImg.color = Color.Lerp(FadeImg.color, Color.yellow, rate);
		a += 1;
		yield WaitForSeconds(0.01);
	}
}

function FadeShifterToRed(name, rate: float) {
	var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
	var a = 0;
	while (a < 10) {
		FadeImg.color = Color.Lerp(FadeImg.color, Color.red, rate);
		a += 1;
		yield WaitForSeconds(0.01);
	}
}
