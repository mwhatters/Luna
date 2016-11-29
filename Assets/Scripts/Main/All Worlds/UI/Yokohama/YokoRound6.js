#pragma strict

public var LB1 : GameObject;
public var LB2 : GameObject;
public var LB3 : GameObject;
public var LB4 : GameObject;
public var LB5 : GameObject;
public var LB6 : GameObject;
public var LB7 : GameObject;
public var LB8 : GameObject;
public var LB9 : GameObject;
public var LB10 : GameObject;
public var LB11 : GameObject;
public var LB12 : GameObject;
public var LB13 : GameObject;
public var LB14 : GameObject;
public var LB15 : GameObject;
public var LB16 : GameObject;

// begin has 3 seconds
function Begin() {
  GetComponent(RoundInitializer).fadeInRound();
  yield WaitForSeconds(2);

  StartCoroutine("Box1Script");
  yield StartCoroutine("Box2Script");

  yield WaitForSeconds(1);

  StopCoroutine("Box1Script");
  StopCoroutine("Box2Script");
  StopCoroutine("Box3Script");
  StopCoroutine("Box4Script");

  // GetComponent(RoundInitializer).fadeOutRound();
}

// total = 8 seconds
function Box1Script() {
  var controller1 = LB1.GetComponent(LogicBox);
  var controller2 = LB2.GetComponent(LogicBox);
  var controller3 = LB3.GetComponent(LogicBox);
  var controller4 = LB4.GetComponent(LogicBox);
  var controller5 = LB5.GetComponent(LogicBox);
  var controller6 = LB6.GetComponent(LogicBox);
  var controller7 = LB7.GetComponent(LogicBox);
  var controller8 = LB8.GetComponent(LogicBox);
  var controller9 = LB9.GetComponent(LogicBox);
  var controller10 = LB10.GetComponent(LogicBox);
  var controller11 = LB11.GetComponent(LogicBox);
  var controller12 = LB12.GetComponent(LogicBox);

  controller1.Enable();
  yield WaitForSeconds(0.05);
  controller2.Enable();
  yield WaitForSeconds(0.05);
  controller3.Enable();
  yield WaitForSeconds(0.05);
  controller4.Enable();
  yield WaitForSeconds(0.05);
  controller5.Enable();
  yield WaitForSeconds(0.05);
  controller6.Enable();
  yield WaitForSeconds(0.05);
  controller7.Enable();
  yield WaitForSeconds(0.05);
  controller8.Enable();
  yield WaitForSeconds(0.05);
  controller9.Enable();
  yield WaitForSeconds(0.05);
  controller10.Enable();
  yield WaitForSeconds(0.05);
  controller11.Enable();
  yield WaitForSeconds(0.05);
  controller12.Enable();

  yield WaitForSeconds(8);

  controller1.Disable();
  controller2.Disable();
  controller3.Disable();
  controller4.Disable();
  controller5.Disable();
  controller6.Disable();
  controller7.Disable();
  controller8.Disable();
  controller9.Disable();
  controller10.Disable();
  controller11.Disable();
  controller12.Disable();
}

function Box2Script() {
  var controller13 = LB13.GetComponent(LogicBox);
  var controller14 = LB14.GetComponent(LogicBox);
  var controller15 = LB15.GetComponent(LogicBox);
  var controller16 = LB16.GetComponent(LogicBox);

  yield WaitForSeconds(4);

  controller13.Enable();
  controller14.Enable();
  controller15.Enable();
  controller16.Enable();

  yield WaitForSeconds(4);

  controller13.Disable();
  controller14.Disable();
  controller15.Disable();
  controller16.Disable();
}
