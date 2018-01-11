import React from 'react';
import { Field, FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import { defaultState } from '../../model/calculated-variable';

import Input from 'forms/controls/input';
import { TextareaWithVariableAutoCompletion } from 'forms/controls/control-with-suggestions';
import { ListWithInputPanel } from 'widgets/list-with-input-panel';
import { validateCalculatedVariableForm } from 'utils/validation/validate';

import Dictionary from 'utils/dictionary/dictionary';
import { TABS_PATHS, DEFAULT_FORM_NAME } from 'constants/pogues-constants';

// Utils

const validateForm = (addErrors, validate) => (values, state) => {
  return validate(values, addErrors, state);
};

// Prop types and default props

export const propTypes = {
  formName: PropTypes.string,
  selectorPath: PropTypes.string,
  errors: PropTypes.array,
  addErrors: PropTypes.func.isRequired,
};

export const defaultProps = {
  formName: DEFAULT_FORM_NAME,
  selectorPath: TABS_PATHS.CALCULATED_VARIABLES,
  errors: [],
};

// Component

function CalculatedVariables({ formName, selectorPath, errors, addErrors }) {
  return (
    <FormSection name={selectorPath}>
      <ListWithInputPanel
        formName={formName}
        selectorPath={selectorPath}
        name="calculatedVariables"
        errors={errors}
        validateForm={validateForm(addErrors, validateCalculatedVariableForm)}
        resetObject={defaultState}
        canDuplicate={false}
      >
        <Field name="label" type="text" component={Input} label={Dictionary.label} required />
        <Field name="name" type="text" component={Input} label={Dictionary.name} required />
        <Field
          name="formula"
          type="text"
          component={TextareaWithVariableAutoCompletion}
          label={Dictionary.formula}
          required
        />
      </ListWithInputPanel>
    </FormSection>
  );
}

CalculatedVariables.propTypes = propTypes;
CalculatedVariables.defaultProps = defaultProps;

export default CalculatedVariables;