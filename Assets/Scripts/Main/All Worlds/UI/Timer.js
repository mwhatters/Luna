#pragma strict
import UnityEngine.UI;

public var timerLabel : Text;
private var time : float;
public var running = true;


function Update () {
  if (!running) { return false; }

  time = Time.time;
  var intTime : int = time;
  var minutes : int = intTime / 60;
  var seconds : int = intTime % 60;
  var fraction : int = (time * 100);
  fraction = fraction % 100;

  // timerLabel.text = String.Format ("{0:00} : {1:00} : {2:000}", minutes, seconds, fraction);
  timerLabel.text = String.Format("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction);
}
