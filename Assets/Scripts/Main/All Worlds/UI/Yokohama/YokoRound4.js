#pragma strict

public var LB1 : GameObject;
public var LB2 : GameObject;
public var LB3 : GameObject;
public var LB4 : GameObject;

// begin has 4 seconds
function Begin() {
  GetComponent(RoundInitializer).fadeInRound();
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

// total = 13 seconds
function Box1Script() {
  var controller = LB1.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(1);
  controller.SetMovement(4.0, 0.0, -0.3);
  yield WaitForSeconds(12);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}

function Box2Script() {
  var controller = LB2.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(1);
  controller.SetMovement(0.0, 0.0, 0.3);
  yield WaitForSeconds(12);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}

function Box3Script() {
  var controller = LB3.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(1);
  controller.SetMovement(0.0, 0.0, 0.3);
  yield WaitForSeconds(12);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}

function Box4Script() {
  var controller = LB4.GetComponent(LogicBox);
  controller.Enable();
  yield WaitForSeconds(1);
  controller.SetMovement(0.0, 0.0, -0.3);
  yield WaitForSeconds(12);
  controller.DisableMovement();
  yield WaitForSeconds(1);
  controller.Disable();
}
