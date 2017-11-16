import merge from 'lodash.merge';

import {
  QUESTION_TYPE_ENUM,
  CODES_LIST_INPUT_ENUM,
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';
import {
  required,
  requiredSelect,
  emptyCodes,
  emptyMeasures,
  name as validName,
  minValue,
  maxValue,
} from 'forms/validation-rules';

import Dictionary from 'utils/dictionary/dictionary';

const { SIMPLE, SINGLE_CHOICE, MULTIPLE_CHOICE, TABLE } = QUESTION_TYPE_ENUM;
const { NEW, QUEST } = CODES_LIST_INPUT_ENUM;
const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { NUMERIC, TEXT } = DATATYPE_NAME;

function validateSimpleText(value, path) {
  const validationErrors = [];
  const requiredValue = required(value.maxLength);
  const minLength = minValue(1)(value.maxLength);

  if (requiredValue) validationErrors.push([`${path}.maxLength`, requiredValue]);
  if (minLength) validationErrors.push([`${path}.maxLength`, minLength]);

  return validationErrors;
}

function validateSimpleNumeric(value, path) {
  const validationErrors = [];
  let minLengthMin;

  if (value.minimun !== '0') minLengthMin = minValue(0)(value.minimum);

  const minLengthMax = minValue(1)(value.maximum);

  if (minLengthMin) validationErrors.push([`${path}.minimum`, minLengthMin]);
  if (minLengthMax) validationErrors.push([`${path}.maximum`, minLengthMax]);

  return validationErrors;
}

function validateSimple(values, path) {
  let validationErrors = [];
  const { type, [type]: simple } = values;

  if (type === NUMERIC) {
    validationErrors = validateSimpleNumeric(simple, `${path}.${NUMERIC}`);
  } else if (type === TEXT) {
    validationErrors = validateSimpleText(simple, `${path}.${TEXT}`);
  }

  return validationErrors;
}

/**
 * This method will validate a code. In case validation errors are found, they are added to the validation errors
 * list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the code.
 * @param {string}  path      The code path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
// function validateCode(values, path) {
//   const validationErrors = [];
//   const { code, label } = values;
//   const isValidCode = validName(code);
//   const codeRequired = required(code);
//   const labelRequired = required(label);
//
//   if (codeRequired) validationErrors.push([`${path}.code`, codeRequired]);
//   if (isValidCode) validationErrors.push([`${path}.code`, isValidCode]);
//   if (labelRequired) validationErrors.push([`${path}.label`, labelRequired]);
//
//   return validationErrors;
// }

/**
 * This method will validate a codes list. In case validation errors are found, they are added to the validation errors
 * list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the codes list.
 * @param {string}  path      The codes list path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateCodesList(values, path) {
  const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id, label, codes, panel } } = values;
  const validationErrors = [];
  let idRequired;
  let labelRequired;
  let notEmptyCodes;

  if (panel === NEW) {
    labelRequired = required(label);
    notEmptyCodes = emptyCodes(codes);
  } else {
    idRequired = required(id);
  }

  if (labelRequired) {
    validationErrors.push([`${path}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.label`, labelRequired]);
  } else if (notEmptyCodes) {
    validationErrors.push([`${path}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.label`, Dictionary.validationNoCodes]);
  } else if (idRequired) {
    validationErrors.push([`${path}.${DEFAULT_CODES_LIST_SELECTOR_PATH}.id`, idRequired]);
  }

  return validationErrors;
}

/**
 * This method will validate the values for a response format table with type LIST. In case validation errors are
 * found, they are added to the validation errors list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the items in the response format table with type LIST.
 * @param {string}  path      The path to the response format table with type LIST in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateList(values, path) {
  const validationErrors = [];
  const { numLinesMin, numLinesMax } = values;
  const numLinesMinMin = minValue(1)(numLinesMin);
  const numLinesMaxMin = minValue(1)(numLinesMax);
  const numLinesMinMax = maxValue(100)(numLinesMin);
  const numLinesMaxMax = maxValue(100)(numLinesMax);

  if (numLinesMinMin) validationErrors.push([`${path}.numLinesMin`, numLinesMinMin]);
  if (numLinesMaxMin) validationErrors.push([`${path}.numLinesMax`, numLinesMaxMin]);
  if (numLinesMinMax) validationErrors.push([`${path}.numLinesMin`, numLinesMinMax]);
  if (numLinesMaxMax) validationErrors.push([`${path}.numLinesMax`, numLinesMaxMax]);

  return validationErrors;
}

function validateTotalLabel(values, path) {
  const validationErrors = [];
  const { showTotalLabel, totalLabel } = values;

  if (showTotalLabel !== '0') {
    const totalLabelRequired = required(totalLabel);

    if (totalLabelRequired) validationErrors.push([`${path}.totalLabel`, totalLabelRequired]);
  }

  return validationErrors;
}

/**
 * This method will validate the values for a response format table MEASURE. In case validation errors are
 * found, they are added to the validation errors list with the path to the element where show the error.
 *
 * @param {object}  values    The values of the measure.
 * @param {string}  path      The measure path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateMeasure(values, path) {
  let validationErrors = [];
  const { label: measureLabel, type: measureType, [measureType]: measure } = values;

  const measureLabelRequired = required(measureLabel);

  if (measureLabelRequired) validationErrors.push([`${path}.label`, measureLabelRequired]);

  if (measureType === SINGLE_CHOICE) {
    validationErrors = [...validationErrors, ...validateCodesList(measure, `${path}.${SINGLE_CHOICE}`)];
  } else {
    validationErrors = [...validationErrors, ...validateSimple(measure, `${path}.${SIMPLE}`)];
  }

  return validationErrors;
}

/**
 * This method obtains the number of codes from a codes list form.
 *
 * @param {object}  values          The codes list form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of codes.
 */
function getNumCodes(values, codesListStore) {
  const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { panel, codes, id } } = values;
  let numCodes = 0;

  if (panel === NEW) {
    numCodes = codes.length;
  } else if (panel === QUEST) {
    const codesList = codesListStore[id] || {};
    numCodes = Object.keys(codesList.codes || {}).length;
  }

  return numCodes;
}

/**
 * This method obtains the number of collected variables expected from a response format of type MULTIPLE
 *
 * @param {object}  values          The response format MULTIPLE form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of collected variables expected.
 */
function getNumCollectedVariablesMultiple(values, codesListStore) {
  const { [PRIMARY]: primary } = values;
  return getNumCodes(primary, codesListStore);
}

/**
 * This method obtains the number of collected variables expected from a response format of type TABLE
 *
 * @param {object}  values          The response format TABLE form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {number} The number of collected variables expected.
 */
function getNumCollectedVariablesTable(values, codesListStore) {
  let numCollectedVariables;
  const { [PRIMARY]: primaryState, [SECONDARY]: secondaryState, [LIST_MEASURE]: listMeasuresState } = values;

  if (primaryState.type === CODES_LIST) {
    const { [CODES_LIST]: primaryCodesList } = primaryState;
    const numCodesPrimary = getNumCodes(primaryCodesList, codesListStore);

    if (secondaryState.showSecondaryAxis) {
      const numCodesSecondary = getNumCodes(secondaryState, codesListStore);
      numCollectedVariables = numCodesPrimary * numCodesSecondary;
    } else {
      numCollectedVariables = numCodesPrimary * listMeasuresState.measures.length;
    }
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    const numLines = numLinesMax - numLinesMin + 1;
    numCollectedVariables = numLines * listMeasuresState.measures.length;
  }

  return numCollectedVariables;
}

/**
 * This method validate that the number of collected variables expected is the same that the number of collected
 * variables existent.
 *
 * @param {object}  values          The codes list form values.
 * @param {object}  codesListStore  The codes lists store.
 * @param {string}  path            The collected variables path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateCollectedVariables(values, codesListStore, path) {
  const validationErrors = [];
  let numExpectedCollectedVariables;
  const { responseFormat: { type, [type]: responseFormat }, collectedVariables: { collectedVariables } } = values;

  if (type === SIMPLE || type === SINGLE_CHOICE) {
    numExpectedCollectedVariables = 1;
  } else if (type === MULTIPLE_CHOICE) {
    numExpectedCollectedVariables = getNumCollectedVariablesMultiple(responseFormat, codesListStore);
  } else {
    numExpectedCollectedVariables = getNumCollectedVariablesTable(responseFormat, codesListStore);
  }

  if (numExpectedCollectedVariables !== collectedVariables.length)
    validationErrors.push([`${path}.label`, Dictionary.validation_collectedvariable_need_reset]);

  return validationErrors;
}

function validateNameLabel(values) {
  const validationErrors = [];
  const { name, label } = values;
  const isValidName = validName(name);
  const nameRequired = required(name);
  const labelRequired = required(label);

  if (isValidName) validationErrors.push(['name', isValidName]);
  if (nameRequired) validationErrors.push(['name', nameRequired]);
  if (labelRequired) validationErrors.push(['label', labelRequired]);

  return validationErrors;
}

/**
 * This method validate that the response format values are valids.
 *
 * @param {object}  values  The codes list form values.
 * @param {string}  path    The collected variables path in the form object.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
function validateResponseFormat(values, path) {
  const { responseFormat: { type, [type]: responseFormat } } = values;
  const responseFormatRequired = requiredSelect(type);
  let validationErrors = [];

  if (responseFormatRequired) {
    validationErrors.type = responseFormatRequired;
    validationErrors.push([`${path}.type`, responseFormatRequired]);
  } else if (type === SIMPLE) {
    validationErrors = validateSimple(responseFormat, `${path}.${type}`);
  } else if (type === SINGLE_CHOICE) {
    validationErrors = validateCodesList(responseFormat, `${path}.${type}`);
  } else if (type === MULTIPLE_CHOICE) {
    const { type: measureType, [measureType]: measure } = responseFormat[MEASURE];

    validationErrors = validateCodesList(responseFormat[PRIMARY], `${path}.${MULTIPLE_CHOICE}.${PRIMARY}`);

    if (measureType === CODES_LIST) {
      validationErrors = [
        ...validationErrors,
        ...validateCodesList(measure, `${path}.${MULTIPLE_CHOICE}.${MEASURE}.${CODES_LIST}`),
      ];
    }
  } else if (type === TABLE) {
    const {
      [PRIMARY]: { type: primaryType, [primaryType]: primary, ...primaryTotalLabel },
      [SECONDARY]: { showSecondaryAxis, ...secondary },
      [MEASURE]: measure,
      [LIST_MEASURE]: { measures },
    } = responseFormat;

    validationErrors = validateTotalLabel(primaryTotalLabel, `${path}.${TABLE}.${PRIMARY}`);

    if (primaryType === LIST) {
      validationErrors = [...validationErrors, ...validateList(primary, `${path}.${TABLE}.${PRIMARY}.${LIST}`)];
    } else {
      validationErrors = [
        ...validationErrors,
        ...validateCodesList(primary, `${path}.${TABLE}.${PRIMARY}.${CODES_LIST}`),
      ];

      if (showSecondaryAxis) {
        validationErrors = [
          ...validationErrors,
          ...validateTotalLabel(secondary, `${path}.${TABLE}.${SECONDARY}`),
          ...validateCodesList(secondary, `${path}.${TABLE}.${SECONDARY}`),
        ];
      }
    }

    if (showSecondaryAxis) {
      validationErrors = [...validationErrors, ...validateMeasure(measure, `${path}.${TABLE}.${MEASURE}`)];
    } else {
      const notEmptyMeasures = emptyMeasures(measures);

      if (notEmptyMeasures) validationErrors.push([`${path}.${TABLE}.${LIST_MEASURE}.label`, notEmptyMeasures]);
    }
  }

  return validationErrors;
}

/**
 * This method build a nested object using the keys passed in path and add a message to the deeper object key.
 *
 * @param {string} path     The string with the object keys joined by points (foo.bar.xyz).
 * @param {string} message  The message that will be added to the deeper key.
 *
 * @return {object} The builded object.
 */
function getNestedErrorFromPath(path, message) {
  const keys = path.split('.');

  function getErrorFromKeys(listKeys, errorMessage, errors) {
    const key = listKeys.shift();

    if (keys.length > 0) {
      errors = {
        [key]: getErrorFromKeys(keys, errorMessage),
      };
    } else {
      errors = {
        [key]: message,
      };
    }

    return errors;
  }

  return getErrorFromKeys(keys, message, {});
}

/**
 * This method validate if the question form values are valids.
 *
 * @param {object}  values          The form values.
 * @param {object}  codesListStore  The codes lists store.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
export function getComponentValidationErrors(values, codesListStore) {
  let validationErrors = validateNameLabel(values);

  if (values.responseFormat) {
    validationErrors = [...validationErrors, ...validateResponseFormat(values, 'responseFormat')];

    // The collected variables are validated only when response format is valid.
    if (validationErrors.length === 0) {
      validationErrors = validateCollectedVariables(values, codesListStore, 'collectedVariables');
    }
  }

  return validationErrors;
}

/**
 * This method validate if the questionnaire form values are valids.
 *
 * @param {object}  values          The form values.
 *
 * @return {array}  A list of validation errors. Each item is another array with a first element containing the path
 *                  to the element where show the error and a second element with the error message.
 */
export function getQuestionnaireValidationErrors(values) {
  const validationErrors = validateNameLabel(values);
  const requiredSelectSerie = requiredSelect(values.serie);
  const requiredSelectOperation = requiredSelect(values.operation);
  const requiredCampaigns = required(values.campaigns);

  if (requiredSelectSerie) validationErrors.push(['serie', requiredSelectSerie]);
  if (requiredSelectOperation) validationErrors.push(['operation', requiredSelectOperation]);
  if (requiredCampaigns) validationErrors.push(['campaigns', requiredCampaigns]);

  return validationErrors;
}

/**
 * This method builds an errors object from a list of validation errors.
 *
 * @param {array}  errors The validation errors.
 *
 * @return {object} The errors object.
 */
export function getErrorsObject(errors) {
  return errors.reduce((acc, error) => {
    return merge(acc, getNestedErrorFromPath(error[0], error[1]));
  }, {});
}