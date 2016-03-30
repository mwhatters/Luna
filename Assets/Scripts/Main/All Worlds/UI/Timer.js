#pragma strict
import UnityEngine.UI;

public var timerLabel : Text;
private var time : float;
public var running = true;


function Update () {
  if (!running) { return false; }

  time += Time.deltaTime;
  var minutes = time / 60;
  var seconds = time % 60;
  var fraction = (time * 100) % 100;

  timerLabel.text = String.Format ("{0:00} : {1:00} : {2:000}", minutes, seconds, fraction);
}
