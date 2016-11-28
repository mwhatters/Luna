#pragma strict

public var LB1 : GameObject;
public var LB2 : GameObject;

function Start () {
  Begin();
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

  yield GetComponent(RoundInitializer).fadeOutRound();
}

// script is 11
function Box1Script() {
  var controller = LB1.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(2);
  controller.SetMovement(0, 0, 0.3);
  yield WaitForSeconds(2);
  controller.SetMovement(4.0, 0.0, -0.5);
  yield WaitForSeconds(5);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}

function Box2Script() {
  var controller = LB2.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(2);
  controller.SetMovement(2.0, -1.0, -0.2);
  yield WaitForSeconds(2);
  controller.SetMovement(0.0, 1.0, -0.2);
  yield WaitForSeconds(5);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}
