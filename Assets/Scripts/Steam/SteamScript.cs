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

  // Here begings my coding fully, where I made special functions to handle different types of things to tackle
  //The UnlockAchive functions, unlocks an achivment, on calling
  static public void UnlockAchive(string achievement){
      if (SteamManager.Initialized) {
          SteamUserStats.SetAchievement (achievement);
          StoreStats ();
      }
  }
  //This function is used to set Stats of your SteamWorks. Only works for floats currently, int is broken for handling
  static public void SetStats(string StatusName, float Value, bool toINT){
      if (SteamManager.Initialized) {
          if(toINT){
              //int intData = (int)Value;
              //SteamUserStats.SetStat (StatusName, intData);
          }
          Debug.Log ("Setting stats of: " + StatusName + ", To: " + Value);
          SteamUserStats.SetStat (StatusName, Value);
      StoreStats ();
      }
  }
  //This function is used to Get The Stats of a Stat, in your SteamWorks.
  static public float GetStats(string StatusName){
      float Stats;
      SteamUserStats.GetStat (StatusName, out Stats);
      return Stats;
  }
  //This function saves the stats, after being handled by
  static public void StoreStats(){
      SteamUserStats.StoreStats();
  }
  //Function to reset all the achivements and stats for you only
  //You'll be using this function a lot, in order to test properly.
  static public void Reset(){
      SteamUserStats.ResetAllStats (true);
  }

}
