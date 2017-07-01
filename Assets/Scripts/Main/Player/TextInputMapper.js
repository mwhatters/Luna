#pragma strict

public var active : boolean = false;
public var semiActive : boolean = false;
private var alphabet : String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
private var currentLetter : String = "";

private var letter : String = "";
private var index : int;
private var nameEntry : InputField;
private var mainMenu : GameObject;

private var currentCaret : int;

public var isLoadActive : boolean = false;
private var previousLoadObject : GameObject;

function Start() {
	nameEntry = GameObject.Find("NameEntry").GetComponent(InputField);
	mainMenu = GameObject.Find("Main Menu");
}

function Update() {
		if (isLoadActive) {
			if (InputMapper.input.MoveToReturn()) {
					if (EventSystems.EventSystem.current.currentSelectedGameObject != mainMenu) {
						previousLoadObject = EventSystems.EventSystem.current.currentSelectedGameObject;
					}

				  EventSystems.EventSystem.current.SetSelectedGameObject(mainMenu);
			}

			if (InputMapper.input.ReturnToLoads() && EventSystems.EventSystem.current.currentSelectedGameObject == mainMenu) {
				if (previousLoadObject) {
					EventSystems.EventSystem.current.SetSelectedGameObject(previousLoadObject);
				} else {
					EventSystems.EventSystem.current.SetSelectedGameObject(GameObject.Find("Main Menu"));
				}
			}

			return;
		}


		if (!semiActive && !active) { return; } else {

			if (InputMapper.input.LeaveTextInput()) {
				GameObject.Find("Menu").GetComponent(FrontMenu).leaveNameInput();
			}

			if (InputMapper.input.TextSubmit() && GameObject.Find("Menu").GetComponent(FrontMenu).newGameStartable()) {
				GameObject.Find("Menu").GetComponent(FrontMenu).startNewGame();
			}

		}

    if (!active) { return; }

    if (InputMapper.input.TextEntryUp()) {
        if (currentLetter == "") {
            currentLetter = "A";
        } else {
            if (currentLetter == "Z") {
                currentLetter = "A";
            } else {
                index = alphabet.IndexOf(currentLetter) + 1;
                letter = alphabet[index].ToString();
                currentLetter = letter;
            }
        }

        currentCaret = nameEntry.caretPosition;

        if (currentCaret == 0) {
            nameEntry.text = currentLetter;
        } else {
            nameEntry.text = nameEntry.text.Substring(0, nameEntry.caretPosition) + currentLetter;
        }
        nameEntry.caretPosition = currentCaret;
    }

    if (InputMapper.input.TextEntryDown()) {

        if (currentLetter == "") {
            currentLetter = "Z";
        } else {
            if (currentLetter == "A") {
                currentLetter = "Z";
            } else {
                index = alphabet.IndexOf(currentLetter) - 1;
                letter = alphabet[index].ToString();
                currentLetter = letter;
            }
        }

        currentCaret = nameEntry.caretPosition;

        if (currentCaret == 0) {
            nameEntry.text = currentLetter;
        } else {
            nameEntry.text = nameEntry.text.Substring(0, nameEntry.caretPosition) + currentLetter;
        }
        nameEntry.caretPosition = currentCaret;
    }

    if (InputMapper.input.TextEntryDelete()) {
        if (!(nameEntry.caretPosition == 0)) {
            nameEntry.caretPosition -= 1;
            nameEntry.text = nameEntry.text.Substring(0, nameEntry.caretPosition);
        }
    }

    if (InputMapper.input.TextEntry()) {
        nameEntry.caretPosition += 1;
        try {
            currentLetter = nameEntry.text[nameEntry.caretPosition].ToString();
        } catch(e) {
            currentLetter = "";
        }
    }
}
