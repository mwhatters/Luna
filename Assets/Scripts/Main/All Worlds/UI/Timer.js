﻿#pragma strict
import UnityEngine.UI;

public var timerLabel : Text;
private var time : float;
private var resetTime : float = 0.0;
public var running : boolean = true;

function OnLevelWasLoaded() {
  startTimerFromZero();
}


function Update () {
  if (!running) { return false; }

  time = Time.time - resetTime;
  var intTime : int = time;
  var minutes : int = intTime / 60;
  var seconds : int = intTime % 60;
  var fraction : int = (time * 100);
  fraction = fraction % 100;

  timerLabel.text = String.Format("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction);
  return true;
}


function startTimerFromZero() {
  resetTime = Time.time;
}
