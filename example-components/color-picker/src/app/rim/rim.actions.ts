import { Action } from 'redux';

export const actionTypes = {
  SELECT: 'RIM_SELECT',
};

export class SelectAction implements Action {
  type = actionTypes.SELECT;
  attribute: string;
  constructor(attribute: string) {
    this.attribute = attribute;
  }
}
