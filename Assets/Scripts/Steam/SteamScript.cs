using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Steamworks;

public class SteamScript : MonoBehaviour {

	protected Callback<GameOverlayActivated_t> m_GameOverlayActivated;

	void Awake() {
		DontDestroyOnLoad(transform.gameObject);
	}

	// Use this for initialization
	void Start () {
		if (SteamManager.Initialized) {
			string name = SteamFriends.GetPersonaName();
			Debug.Log(name);
		}
	}

	private void OnEnable() {
		if (SteamManager.Initialized) {
			m_GameOverlayActivated = Callback<GameOverlayActivated_t>.Create(OnGameOverlayActivated);
		}
	}

	private void OnGameOverlayActivated(GameOverlayActivated_t pCallback) {
		if(pCallback.m_bActive != 0) {
			Time.timeScale = 0;
		}
		else {
			Time.timeScale = 1;
		}
	}

}
