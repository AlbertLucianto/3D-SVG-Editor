import { Action } from 'redux';

export const actionTypes = {
  SELECT: 'CIRCLE_SELECT',
};

export class SelectAction implements Action {
  type = actionTypes.SELECT;
  attribute: string;
  constructor(attribute: string) {
    this.attribute = attribute;
  }
}
