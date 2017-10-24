import React, { Component } from 'react';
import { FormSection } from 'redux-form';
import PropTypes from 'prop-types';

import InputMeasure from './input-measure';
import { DIMENSION_TYPE, QUESTION_TYPE_ENUM, CODES_LIST_INPUT_ENUM } from 'constants/pogues-constants';
import ListEntryFormContainer from 'layout/connected-widget/list-entry-form';
import { defaultListMeasuresForm } from 'utils/transformation-entities/response-format-table';
import { required, requiredSelect, uniqueCode, emptyCodes } from 'layout/forms/validation-rules';

const { LIST_MEASURE } = DIMENSION_TYPE;
const { SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { NEW, QUESTIONNAIRE } = CODES_LIST_INPUT_ENUM;

function validationMeasure(values) {
  const { label, type: typeMeasure, [typeMeasure]: measureValues } = values;
  const errors = [];
  let codeListRequired;
  let notEmptyCodes;
  let uniqueCodes;
  let requiredSelectCodesList;
  const labelRequired = required(label);

  if (typeMeasure === SINGLE_CHOICE) {
    const { type: typeCodesList, [typeCodesList]: codesListValues } = measureValues;

    if (typeCodesList === NEW) {
      codeListRequired = required(codesListValues.label);
      notEmptyCodes = emptyCodes(codesListValues.codes);
      uniqueCodes = uniqueCode()(codesListValues.codes);
    } else if (typeCodesList === QUESTIONNAIRE) {
      requiredSelectCodesList = requiredSelect(codesListValues.codesListId);
    }
  }

  if (labelRequired) errors.push('Label is required');
  if (codeListRequired) errors.push('List name required');
  if (notEmptyCodes) errors.push(notEmptyCodes);
  if (uniqueCodes) errors.push(uniqueCodes);
  if (requiredSelectCodesList) errors.push(requiredSelectCodesList);

  return errors;
}

class ResponseFormatTableListMeasures extends Component {
  static selectorPath = LIST_MEASURE;
  static propTypes = {
    selectorPathParent: PropTypes.string,
  };
  static defaultProps = {
    selectorPathParent: undefined,
  };
  constructor(props) {
    const { selectorPathParent } = props;
    super(props);

    this.selectorPathComposed = selectorPathParent
      ? `${selectorPathParent}.${ResponseFormatTableListMeasures.selectorPath}`
      : ResponseFormatTableListMeasures.selectorPath;
  }
  render() {
    const { measures, ...initialInputValues } = defaultListMeasuresForm;
    const inputMeasureView = <InputMeasure selectorPath={this.selectorPathComposed} />;

    return (
      <FormSection name={ResponseFormatTableListMeasures.selectorPath}>
        <ListEntryFormContainer
          inputView={inputMeasureView}
          initialInputValues={initialInputValues}
          selectorPath={this.selectorPathComposed}
          validationInput={validationMeasure}
          listName="measures"
          submitLabel="addMeasure"
          noValueLabel="noMeasureYet"
        />
      </FormSection>
    );
  }
}

export default ResponseFormatTableListMeasures;
