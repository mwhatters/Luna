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
  ObjectFX.use.BlinkToColor(LB2.GetComponent(SpriteRenderer), Color.red);
  ObjectFX.use.BlinkToColor(LB3.GetComponent(SpriteRenderer), Color.red);
  ObjectFX.use.BlinkToColor(LB4.GetComponent(SpriteRenderer), Color.red);

  yield WaitForSeconds(2);


  StartCoroutine("Box1Script");
  StartCoroutine("Box2Script");
  StartCoroutine("Box3Script");
  yield StartCoroutine("Box4Script"); // yield last coroutine

  yield WaitForSeconds(1);

  StopCoroutine("Box1Script");
  StopCoroutine("Box2Script");
  StopCoroutine("Box3Script");
  StopCoroutine("Box4Script");

  GetComponent(RoundInitializer).fadeOutRound();
}

// total = 51 seconds
function Box1Script() {
  var controller = LB1.GetComponent(LogicBox);
  controller.Enable();

  // part a -- 11
  yield WaitForSeconds(3);
  controller.SetMovement(-8, -8, 0.0);
  yield WaitForSeconds(5);
  controller.DisableMovement();
  yield WaitForSeconds(3);

  // part b -- 16
  controller.SetMovement(0, 6, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(7, 0, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(0, -4.5, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(-4.5, 4.5, 0.0);
  yield WaitForSeconds(4);
  controller.DisableMovement();

  // part c -- 11
  yield WaitForSeconds(11);
  controller.Disable();
}


function Box2Script() {
  var controller = LB2.GetComponent(LogicBox);
  controller.Enable();

  // part a -- 11 part b -- 16
  yield WaitForSeconds(27);

  // part c -- 8
  controller.SetMovement(0, 7, 0.0);
  yield WaitForSeconds(4);
  controller.DisableMovement();
  yield WaitForSeconds(4);

  yield WaitForSeconds(3);
  controller.Disable();
}


function Box3Script() {
  var controller = LB3.GetComponent(LogicBox);
  controller.Enable();

  // part a -- 11 part b -- 16
  yield WaitForSeconds(27);

  // part c -- 8
  controller.SetMovement(0, -6, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(4.5, 0, 0.0);
  yield WaitForSeconds(4);
  controller.DisableMovement();

  yield WaitForSeconds(3);
  controller.Disable();
}


function Box4Script() {
  var controller = LB4.GetComponent(LogicBox);
  controller.Enable();

  // part a -- 11
  yield WaitForSeconds(11);

  // part b -- 16
  controller.SetMovement(0, 6, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(7, 0, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(0, -4.5, 0.0);
  yield WaitForSeconds(4);
  controller.SetMovement(-4.5, 4.5, 0.0);
  yield WaitForSeconds(4);
  controller.DisableMovement();

  // part c -- 11
  yield WaitForSeconds(11);
  controller.Disable();
}
