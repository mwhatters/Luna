#pragma strict

public var soundName : String;
public var shouldEmitSound : boolean = false;
private var musicPlaying : boolean = false;

// function FixedUpdate() {
//   if (shouldEmitSound && !musicPlaying) {
//     GetComponent(AudioSource).Play();
//     musicPlaying = true;
//   } else if (musicPlaying && !shouldEmitSound) {
//     GetComponent(AudioSource).Stop();
//     musicPlaying = false;
//   }
// }
