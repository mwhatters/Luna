﻿#pragma strict

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy")) {
    var vel = calculateTrueVelocity();
  }
}

function calculateTrueVelocity() {
  var x = Mathf.Abs(GetComponent(Rigidbody2D).velocity.x);
  var y = Mathf.Abs(GetComponent(Rigidbody2D).velocity.y);
  if (x > y) { return x; } else { return y; }
}
