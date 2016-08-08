#pragma strict

public var Core : GameObject;
public var previousX;
public var previousY;
public var previousRotation;

public var active = false;
public var rate : float = 100;

private var clingerbody : Rigidbody2D;
private var musicPlaying : boolean = false;

function Start() {
  if (!Core) { Core = GameObject.Find("Luna"); }
  clingerbody = this.GetComponent(Rigidbody2D);
}

function FixedUpdate () {
  if (active) {
    Move();
    if (!musicPlaying) {
      GetComponent(AudioSource).Play();
      musicPlaying = true;
    }
  } else {
    if (musicPlaying) {
      GetComponent(AudioSource).Stop();
      musicPlaying = false;
    }
  }
}

function Move () {
    clingerbody.velocity.x += (Core.transform.position.x - this.transform.position.x) / rate;
    clingerbody.velocity.y += (Core.transform.position.y - this.transform.position.y) / rate;
}
