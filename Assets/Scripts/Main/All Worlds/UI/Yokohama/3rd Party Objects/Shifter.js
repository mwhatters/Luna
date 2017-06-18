#pragma downcast

enum shiftDirection { Down, Left, Right, Up }
public var shift = shiftDirection.Down;
public static var lastShift = shiftDirection.Down;
// private var gravityState = null;

public var staticColor : Color = Color.red;
public var activeColor : Color = Color.yellow;

function Start() {
    yield WaitForSeconds(0.04); // THIS SHOULD NOT BE BUT IT FUCKING SOLVES THE PROBLEM
    // the problem is that a small additional amount of time is required for luna's gravity direction to be set by the checkpoint tracker before the shifters
    // rotation is set. Because there's a loading graphic at the beginning of load, this behavior isn't seen in game. I hate it, but it works.
    //
    setShift();
}

function setShift() {
    var beginningGravityState = GameObject.Find("Luna").GetComponent(MainGravity);

        if (this.shift == shiftDirection.Down) {
            FadeShifterTo(this.name, 10, activeColor);
            this.transform.eulerAngles.z = 0;
        }

        if (beginningGravityState.gravityDirection == Direction.Up) {
            this.transform.eulerAngles.z += 180;
        }

        if (beginningGravityState.gravityDirection == Direction.Left) {
            this.transform.eulerAngles.z += -90;
        }

        if (beginningGravityState.gravityDirection == Direction.Right) {
                this.transform.eulerAngles.z += 90;
            }

        lastShift = shiftDirection.Down;
}

function OnTriggerEnter2D(coll : Collider2D) {
    if (coll.gameObject.CompareTag("TheGuy")) {
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
        FadeShifterTo(shiftObject.name, 0.4, activeColor);
      } else {
        FadeShifterTo(shiftObject.name, 0.4, staticColor);
      }
        }
    }
}

function FadeShifterTo(name, rate: float, chosenColor : Color) {
    var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
    var a = 0;
    while (a < 10) {
        FadeImg.color = Color.Lerp(FadeImg.color, chosenColor, rate);
        a += 1;
        yield WaitForSeconds(0.01);
    }
}
