#pragma strict

public var Core : GameObject;
public var previousX;
public var previousY;
public var previousRotation;

public var active = false;
public var rate : float = 100;
public var rotationOnly : boolean = false;

private var clingerbody : Rigidbody2D;
private var musicPlaying : boolean = false;

private var luna : Transform;

function Start() {
  if (!Core) { Core = GameObject.Find("Luna"); }
  clingerbody = this.GetComponent(Rigidbody2D);
  luna = GameObject.Find("Luna").transform;
}

function FixedUpdate () {
  if (active) {
    Move(rotationOnly);
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

function Move (rotationOnly) {
    if (rotationOnly) {
      var m = (luna.position.y - this.transform.position.y)/(luna.position.x - this.transform.position.x);
      this.transform.rotation = Vector2((luna.position.x - this.transform.position.x), (luna.position.y - this.transform.position.y));
    } else {
      clingerbody.velocity.x += (Core.transform.position.x - this.transform.position.x) / rate;
      clingerbody.velocity.y += (Core.transform.position.y - this.transform.position.y) / rate;
    }
}
