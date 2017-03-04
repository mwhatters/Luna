#pragma strict

public var LB1 : GameObject;
public var LB2 : GameObject;
public var LB3 : GameObject;
public var LB4 : GameObject;
var luna : GameObject;
var lunaAlive : PlayerGameStates;

function Start() {
  luna = GameObject.Find("Luna");
  lunaAlive = luna.GetComponent(PlayerGameStates);
}

function Update() {
  if (lunaAlive.isDead) {
    StopAllCoroutines();
  }
}

// begin has 4 seconds
function Begin() {
  GetComponent(RoundInitializer).fadeInRound();
  yield WaitForSeconds(1);
  Sounds.use.ConstructOneOffSound("Blip", this.transform.position);
  ObjectFX.use.BlinkToColor(LB1.GetComponent(SpriteRenderer), Color.red);
  yield WaitForSeconds(1);

  yield StartCoroutine("Box1Script");

  yield WaitForSeconds(1);

  StopCoroutine("Box1Script");

  GetComponent(RoundInitializer).fadeOutRound();
}

// total = 11 seconds
function Box1Script() {
  var controller = LB1.GetComponent(LogicBox);
  controller.SetMovement(0, 0, -0.8);
  yield WaitForSeconds(1);
  controller.Enable();
  yield WaitForSeconds(9);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}
