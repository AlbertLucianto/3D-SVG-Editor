import { Action } from 'redux';
import { ColorType } from './rim.model';

export const actionTypes = {
  SELECT_ATTRIBUTE: 'RIM.SELECT_ATTRIBUTE',
  CHANGE_FILL_COLOR: 'RIM.CHANGE_FILL_COLOR',
  CHANGE_OUTLINE_COLOR: 'RIM.CHANGE_OUTLINE_COLOR',
  CHANGE_OUTLINE_WIDTH: 'RIM.CHANGE_OUTLINE_WIDTH',
};

export class SelectAttributeAction implements Action {
  type = actionTypes.SELECT_ATTRIBUTE;
  attribute: string;
  constructor(attribute: string) {
    this.attribute = attribute;
  }
}

export class ChangeFillColorAction implements Action {
  type = actionTypes.CHANGE_FILL_COLOR;
  color: ColorType;
  constructor(color: ColorType) {
    this.color = color;
  }
}

export class ChangeOutlineColorAction implements Action {
  type = actionTypes.CHANGE_OUTLINE_COLOR;
  color: ColorType;
  constructor(color: ColorType) {
    this.color = color;
  }
}

export class ChangeOutlineWidthAction implements Action {
  type = actionTypes.CHANGE_OUTLINE_WIDTH;
  width: number;
  constructor(width: number) {
    this.width = width;
  }
}
