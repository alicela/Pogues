import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import Simple, { defaultState as simpleDefault } from '../simple/model/response-format-simple';
import Single, { defaultState as singleDefault } from '../single/model/response-format-single';
import Multiple, { defaultState as multipleDefault } from '../multiple/model/response-format-multiple';
import Table, { defaultState as tableDefault } from '../table/model/response-format-table';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;

export const defaultForm = {
  [SIMPLE]: simpleDefault,
  [SINGLE_CHOICE]: singleDefault,
  [MULTIPLE_CHOICE]: multipleDefault,
  [TABLE]: tableDefault,
  type: '',
};

export function formToState(form, transformers) {
  const { type, [type]: responseFormatForm } = form;
  const state = {
    type,
  };

  if (type === SINGLE_CHOICE) {
    state[type] = transformers.single.formToState(responseFormatForm);
  } else if (type === MULTIPLE_CHOICE) {
    state[type] = transformers.multiple.formToState(responseFormatForm);
  } else if (type === TABLE) {
    state[type] = transformers.table.formToState(responseFormatForm);
  } else {
    state[type] = transformers.simple.formToState(responseFormatForm);
  }

  return state;
}

export function stateToForm(currentState, transformers) {
  const { type } = currentState;

  return merge(cloneDeep(defaultForm), {
    type,
    [SIMPLE]: transformers.simple.stateToForm(),
    [SINGLE_CHOICE]: transformers.single.stateToForm(),
    [MULTIPLE_CHOICE]: transformers.multiple.stateToForm(),
    [TABLE]: transformers.table.stateToForm(),
  });
}

const Factory = (initialState = {}, codesListsStore) => {
  let currentState = merge(cloneDeep(defaultForm), initialState);

  const transformers = {
    simple: Simple(currentState[SIMPLE]),
    single: Single(currentState[SINGLE_CHOICE], codesListsStore),
    multiple: Multiple(currentState[MULTIPLE_CHOICE], codesListsStore),
    table: Table(currentState[TABLE], codesListsStore),
  };

  return {
    formToState: form => {
      if (form) {
        const state = formToState(form, transformers);
        currentState = merge(cloneDeep(currentState), state);
        return state;
      }
      return currentState;
    },
    stateToForm: () => {
      return stateToForm(currentState, transformers);
    },
    getCodesListStore: () => {
      let codesLists;

      if (currentState.type === SINGLE_CHOICE) {
        codesLists = transformers.single.getCodesListStore();
      } else if (currentState.type === MULTIPLE_CHOICE) {
        codesLists = transformers.multiple.getCodesListStore();
      } else if (currentState.type === TABLE) {
        codesLists = transformers.table.getCodesListStore();
      }

      return codesLists;
    },
  };
};

export default Factory;