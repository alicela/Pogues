import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Select from 'layout/forms/controls/select';
import ListRadioButtons from 'layout/forms/controls/list-radio-buttons';
import { requiredSelect } from 'layout/forms/validation-rules';

function ComponentSelectorByType({ activeComponent, label, components, radio, emptyValue, validateInline }) {
  const validationProps = validateInline ? { validate: [requiredSelect] } : {};
  const selector = radio ? (
    <Field
      name="type"
      component={ListRadioButtons}
      label={label}
      radios={components}
      required
      emptyValue={emptyValue}
      {...validationProps}
    />
  ) : (
    <Field
      name="type"
      component={Select}
      label={label}
      options={components}
      required
      emptyValue={emptyValue}
      {...validationProps}
    />
  );

  const content = activeComponent.id ? <div key={activeComponent.id}>{activeComponent.content}</div> : '';

  return (
    <div>
      {selector}
      {content}
    </div>
  );
}

ComponentSelectorByType.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  activeComponent: PropTypes.object,
  radio: PropTypes.bool,
  emptyValue: PropTypes.string,
  validateInline: PropTypes.bool,
};

ComponentSelectorByType.defaultProps = {
  activeComponent: {},
  radio: false,
  emptyValue: '',
  validateInline: true,
};

export default ComponentSelectorByType;
