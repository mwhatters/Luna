#pragma strict

import InControl;
@script RequireComponent(InControlInputModule)

public class MenuControls extends PlayerActionSet {
  public var Up : PlayerAction;
  public var Down : PlayerAction;
  public var Left : PlayerAction;
  public var Right : PlayerAction;
  public var Submit : PlayerAction;
  public var Cancel : PlayerAction;
  public var Move : PlayerTwoAxisAction;

  public function MenuControls() {
    Up = CreatePlayerAction("Menu Up");
    Down = CreatePlayerAction("Menu Down");
    Left = CreatePlayerAction("Menu Left");
    Right = CreatePlayerAction("Menu Right");
    Submit = CreatePlayerAction("Menu Submit");
    Cancel = CreatePlayerAction("Menu Cancel");
    Move = CreateTwoAxisPlayerAction(Left, Right, Down, Up);
  }
}

var actions : MenuControls;

function OnEnable() {
  CreateActions();
  var inputModule = GetComponent(InControlInputModule);

  if (inputModule != null) {
    inputModule.SubmitAction = actions.Submit;
    inputModule.CancelAction = actions.Cancel;
    inputModule.MoveAction = actions.Move;
  }
}

function OnDisable() {
  DestroyActions();
}

function CreateActions() {
  actions = new MenuControls();

  actions.Submit.AddDefaultBinding(InputControlType.Action1);
  actions.Submit.AddDefaultBinding(Key.Space);
  actions.Submit.AddDefaultBinding(Key.Return);

  actions.Cancel.AddDefaultBinding(InputControlType.Action2);
  actions.Cancel.AddDefaultBinding(InputControlType.Command);
  actions.Cancel.AddDefaultBinding(Key.Escape);

  actions.Up.AddDefaultBinding(InputControlType.LeftStickUp);
  actions.Up.AddDefaultBinding(InputControlType.DPadUp);
  actions.Up.AddDefaultBinding(Key.UpArrow);

  actions.Down.AddDefaultBinding(InputControlType.LeftStickDown);
  actions.Down.AddDefaultBinding(InputControlType.DPadDown);
  actions.Down.AddDefaultBinding(Key.DownArrow);

  actions.Left.AddDefaultBinding(InputControlType.LeftStickLeft);
  actions.Left.AddDefaultBinding(InputControlType.DPadLeft);
  actions.Left.AddDefaultBinding(Key.LeftArrow);

  actions.Right.AddDefaultBinding(InputControlType.LeftStickRight);
  actions.Right.AddDefaultBinding(InputControlType.DPadRight);
  actions.Right.AddDefaultBinding(Key.RightArrow);
}

function DestroyActions() {
  actions.Destroy();
}
