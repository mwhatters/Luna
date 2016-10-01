#pragma strict

enum shiftDirection { Down, Left, Right, Up }
public var shift = shiftDirection.Down;
public static var lastShift = shiftDirection.Down;
// private var gravityState = null;

function Start() {
	var beginningGravityState = GameObject.Find("Luna").GetComponent(MainGravity);

		if (this.shift == shiftDirection.Down) {
			FadeShifterToYellow(this.name, 10);
		}

		if (beginningGravityState.gravityDirection == Direction.Up) {
			this.transform.rotation.z = -180;
		}

		if (beginningGravityState.gravityDirection == Direction.Left) {
			this.transform.rotation.z = 90;
		}

		if (beginningGravityState.gravityDirection == Direction.Right) {
			this.transform.rotation.z = -90;
		}

		lastShift = shiftDirection.Down;
}

function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.gameObject.tag == "TheGuy") {
		var gravityState = coll.gameObject.GetComponent(MainGravity);

		switch (shift)
		{
			case shiftDirection.Up:
				gravityState.gravityObjectDirection = ObjectDirection.Up;
				break;
			case shiftDirection.Down:
				gravityState.gravityObjectDirection = ObjectDirection.Down;
				break;
			case shiftDirection.Left:
				gravityState.gravityObjectDirection = ObjectDirection.Left;
				break;
			case shiftDirection.Right:
				gravityState.gravityObjectDirection = ObjectDirection.Right;
				break;
		}

		gravityState.setWorldGravityShift();


    if (lastShift != shift) { Sounds.use.PlaySoundByTag("ShiftSound"); }
		lastShift = shift;

    adjustShifterColors(["ShifterL", "ShifterD", "ShifterR", "ShifterU"]);
  }
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
