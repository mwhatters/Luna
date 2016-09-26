#pragma strict

enum shiftDirection { Down, Left, Right, Up }
public var shift = exitDirection.Down;

public static var lastShift = exitDirection.Down;

function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.gameObject.tag == "TheGuy") {
		var gravityState = coll.gameObject.GetComponent(MainGravity);

		switch (shift)
		{
			case exitDirection.Up:
				gravityState.gravityObjectDirection = ObjectDirection.Up;
				break;
			case exitDirection.Down:
				gravityState.gravityObjectDirection = ObjectDirection.Down;
				break;
			case exitDirection.Left:
				gravityState.gravityObjectDirection = ObjectDirection.Left;
				break;
			case exitDirection.Right:
				gravityState.gravityObjectDirection = ObjectDirection.Right;
				break;
		}

		gravityState.setWorldGravityShift();


    if (lastShift != shift) { Sounds.use.PlaySoundByTag("ShiftSound"); }
		lastShift = shift;

    adjustShifterColors(["ShifterL", "ShifterD", "ShifterR", "ShifterU"]);
  }
}

function beginShift() {

}

function adjustShifterColors(shifters : String[]) {
	for (var shifter : String in shifters) {
		var shiftObjects = GameObject.FindGameObjectsWithTag(shifter);
		for (var shiftObject in shiftObjects) {
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
