import { uuid } from 'utils/utils';

export const defaultForm = {
  name: '',
  label: '',
  collectedVariables: [],
};

export function formToState(form) {
  const { name, label } = form;
  const id = form.id || uuid();

  return {
    id,
    name,
    label,
  };
}

export function formToStore(form) {
  const { collectedVariables } = form;

  return collectedVariables.reduce((acc, cv) => {
    const state = formToState(cv);

    return {
      ...acc,
      [state.id]: state,
    };
  }, {});
}

export function storeToForm(currentStore) {
  const collectedVariables = Object.keys(currentStore).map(key => {
    const { id, name, label } = currentStore[key];
    return {
      id,
      name,
      label,
    };
  });

  return {
    ...defaultForm,
    collectedVariables,
  };
}

const Factory = (currentState = [], collectedVariablesStore) => {
  let currentStore = currentState.reduce((acc, key) => {
    return {
      ...acc,
      [key]: collectedVariablesStore[key],
    };
  }, {});

  return {
    formToStore: form => {
      if (form) currentStore = formToStore(form);
      return currentStore;
    },
    formToComponentState: form => {
      if (form) currentStore = formToStore(form);
      currentState = Object.keys(currentStore);
      return currentState;
    },
    storeToForm: () => {
      return storeToForm(currentStore);
    },
    getStore: () => {
      return currentStore;
    },
  };
};

export default Factory;