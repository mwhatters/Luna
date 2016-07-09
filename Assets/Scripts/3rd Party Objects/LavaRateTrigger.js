﻿#pragma strict

private var triggered : boolean = false;
public var lava : GameObject;
public var desiredRate : float = 0;
public var colliderObject : GameObject;
public var otherObjects : GameObject[];

function OnTriggerEnter2D(coll : Collider2D) {
  Debug.Log(coll.name);
  if (coll.name != colliderObject.name) { return false; }
  if (triggered) { return false; } else { triggered = true; }

  lava.GetComponent(Lava).rate = desiredRate;

  for (var obj in otherObjects) {
    obj.GetComponent(Lava).rate = desiredRate;
  }
}
