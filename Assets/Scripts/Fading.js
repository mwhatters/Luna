#pragma strict

public var texture : Texture2D;
public var fadeSpeed : float;

private var drawDepth = -10;
private var alpha = 1.0;
private var fadeDir = -1; // in for -1, out for 1

function OnGUI() {
	alpha += fadeDir * fadeSpeed * Time.deltaTime;
	alpha = Mathf.Clamp01(alpha);


	GUI.color = Color(GUI.color.r, GUI.color.g, GUI.color.b, alpha);
	GUI.depth = drawDepth;
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), texture);
}

function beginFade(speed : float) {
	fadeSpeed = speed;
}


// On Level Load

function OnLevelWasLoaded() {
//	beginFade(-1);	
}