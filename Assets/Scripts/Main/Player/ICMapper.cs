using UnityEngine;
using System.Collections;
using InControl;

public class ICMapper : MonoBehaviour {

	// Use this for initialization
	void Start () {
		InputDevice device = InputManager.ActiveDevice;
		InputControl control = device.GetControl( InputControlType.Action1 );
		Debug.Log(control.State);
	}
}
