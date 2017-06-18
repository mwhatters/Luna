#pragma strict

public var active : boolean = false;
private var alphabet : String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
private var currentLetter : String = "";

private var letter : String = "";
private var index : int;
private var nameEntry : InputField;

private var currentCaret : int;

function Start() {
	nameEntry = GameObject.Find("NameEntry").GetComponent(InputField);
}

function Update() {
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

    // if (InputMapper.input.LeaveTextInput()) {
    //  GameObject.Find("Menu").GetComponent(FrontMenu).leaveNameInput();
    // }

    if (InputMapper.input.TextSubmit()) {
        if (nameEntry.text == "") { return; }
        GameObject.Find("Menu").GetComponent(FrontMenu).startNewGame();
    }
}
