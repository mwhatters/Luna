#pragma strict

public var prefab : GameObject;
public var canvas : GameObject;

private var resolutionsContainer : RectTransform;

public var qualityButtons: GameObject[];
public var resolutionButtons: GameObject[];
private var resolutions : Resolution[];

function Start () {
	resolutions = Screen.resolutions;
	qualityButtons = GameObject.FindGameObjectsWithTag("QualityOption");

	resolutionsContainer = GameObject.Find("ResolutionsWrapper").GetComponent(RectTransform);
  yield WaitForSeconds(0.5);

	var x = 70;
	var y = -40;

	for (var res in resolutions) {
		var thisPrefab = Instantiate(prefab, new Vector3(x,y,0), Quaternion.identity).gameObject;
		thisPrefab.name = res.width.ToString() + " x " + res.height.ToString();
		thisPrefab.transform.SetParent(canvas.transform, false);

		var nameField = thisPrefab.GetComponent(Text);
		nameField.text = res.width.ToString() + " x " + res.height.ToString();
		y -= 23;

		AddListener(thisPrefab.GetComponent(Button), res.width, res.height);
	}

	determineQuality();
	SceneHelper.use.FadeImageToClear("Blackness", 0.3);

	yield WaitForSeconds(1);
	resolutionButtons = GameObject.FindGameObjectsWithTag("ResolutionOption");
	determineResolution();
}

function determineQuality() {
	var qualityLevel = QualitySettings.GetQualityLevel();
	var foundButton : Button;
	if (qualityLevel == 2) { // High
		foundButton = GameObject.Find("High").GetComponent(Button);
	} else if (qualityLevel == 1) { // Medium
		foundButton = GameObject.Find("Medium").GetComponent(Button);
	} else if (qualityLevel == 0) { // Low
		foundButton = GameObject.Find("Low").GetComponent(Button);
	}

	var foundColors = foundButton.colors;
	foundColors.normalColor = Color.cyan;
	foundButton.colors = foundColors;
}

function determineResolution() {
	for (var res in resolutions) {
		if (Screen.width == res.width && Screen.height == res.height) {
			var resolutionName = res.width.ToString() + " x " + res.height.ToString();
			var currentResButton = GameObject.Find(resolutionName).GetComponent(Button);
			
			var crColors = currentResButton.colors;
			crColors.normalColor = Color.cyan;
			currentResButton.colors = crColors;
		}
	}
}

function setGameQuality(name : String) {
	var names = QualitySettings.names;
	for (var i = 0; i < names.Length; i++) {
		if (name == names[i]) {
			QualitySettings.SetQualityLevel(i, true);
		}
	}

	// reset button colors
	for (var qbutton : GameObject in qualityButtons) {
		var qColors = qbutton.GetComponent(Button).colors;
		qColors.normalColor = Color.white;
		qbutton.GetComponent(Button).colors = qColors;
	}

	determineQuality();
}

function setResolution(width : int, height : int) {
	Screen.SetResolution(width, height, true);

	// reset button colors
	for (var rbutton : GameObject in resolutionButtons) {
		var rColors = rbutton.GetComponent(Button).colors;
		rColors.normalColor = Color.white;
		rbutton.GetComponent(Button).colors = rColors;
	}

	determineResolution();
}

function AddListener(b : Button, width : int, height : int) {
  b.onClick.AddListener(
    function() {
      setResolution(width, height);
    }
  );
}

public function ReturnToMainMenu() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToMainMenu", 1.5);
}

function GoToMainMenu() {
  SceneManager.LoadScene(0);
}
