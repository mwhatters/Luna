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
  yield WaitForSeconds(2);

  StartCoroutine("Box1Script");
  yield StartCoroutine("Box2Script"); // yield last coroutine

  yield WaitForSeconds(1);

  StopCoroutine("Box1Script");
  StopCoroutine("Box2Script");

  GetComponent(RoundInitializer).fadeOutRound();
}

// total = 11 seconds
function Box1Script() {
  var controller = LB1.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(2);
  controller.SetMovement(4, 0, -0.4);
  yield WaitForSeconds(2);
  controller.SetMovement(4.0, 0.0, -0.4);
  yield WaitForSeconds(5);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}

function Box2Script() {
  var controller = LB2.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(2);
  controller.SetMovement(0.0, 0.0, 0.0);
  yield WaitForSeconds(1);
  controller.SetMovement(0.0, 0.0, 0.4);
  yield WaitForSeconds(6);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}
