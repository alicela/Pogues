import * as ResponseFormatSimple from './response-format-simple';
import * as ResponseFormatSingle from './response-format-single';
import * as CodeList from './codes-list';
import * as Dimension from './dimension';
import * as Response from './response';
import {
  DIMENSION_TYPE,
  DIMENSION_FORMATS,
  QUESTION_TYPE_ENUM,
  DATATYPE_NAME,
  DEFAULT_CODES_LIST_SELECTOR_PATH,
} from 'constants/pogues-constants';

const { PRIMARY, SECONDARY, MEASURE, LIST_MEASURE } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = DIMENSION_FORMATS;
const { SIMPLE, SINGLE_CHOICE } = QUESTION_TYPE_ENUM;
const { TEXT } = DATATYPE_NAME;

// HELPERS

function getDimensionsByType(type, dimensions) {
  let dimension;

  for (let i = 0; i < dimensions.length; i += 1) {
    if (dimensions[i].dimensionType === type) {
      dimension = dimensions[i];
      break;
    }
  }

  return dimension;
}

function getDimensionsMeasures(dimensions) {
  return dimensions.reduce((acc, d) => {
    if (d.dimensionType === MEASURE) acc.push(d);
    return acc;
  }, []);
}

function getResponsesOffset(primaryState, secondaryState, activeCodeLists) {
  let responseOffset = 1;

  if (primaryState.type === CODES_LIST) {
    const { CODES_LIST: { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListIdPrimary } } } = primaryState;
    let responseOffsetSecondary = 1;

    if (secondaryState) {
      const { [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListIdSecondary } } = secondaryState;
      responseOffsetSecondary = Object.keys(activeCodeLists[codesListIdSecondary].codes).length;
    }

    responseOffset = Object.keys(activeCodeLists[codesListIdPrimary].codes).length * responseOffsetSecondary;
  } else {
    const { LIST: { numLinesMin, numLinesMax } } = primaryState;
    responseOffset = numLinesMax - numLinesMin + 1;
  }
  return responseOffset;
}

function getMeasuresModel(responses, dimensions, offset) {
  const responsesModel = [];
  for (let i = 0; i < dimensions.length; i += 1) {
    responsesModel.push({
      Label: dimensions[i].Label,
      response: responses[i * offset],
    });
  }
  return responsesModel;
}

function parseDynamic(dynamic) {
  return dynamic.split('-').map(v => {
    return v.length > 0 ? parseInt(v, 10) : 0;
  });
}

// REMOTE TO STATE

function remoteToStatePrimary(remote) {
  const { totalLabel, dynamic, CodeListReference } = remote;
  let state = {};

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  if (CodeListReference) {
    state = {
      ...state,
      type: CODES_LIST,
      [CODES_LIST]: { [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(CodeListReference) },
    };
  } else {
    const [numLinesMin, numLinesMax] = parseDynamic(dynamic);
    state = {
      ...state,
      type: LIST,
      [LIST]: {
        numLinesMin: numLinesMin,
        numLinesMax: numLinesMax,
      },
    };
  }

  return state;
}

function remoteToStateSecondary(remote) {
  const { totalLabel, CodeListReference } = remote;
  const state = {
    showSecondaryAxis: true,
    [DEFAULT_CODES_LIST_SELECTOR_PATH]: CodeList.remoteToState(CodeListReference),
  };

  if (totalLabel) {
    state.showTotalLabel = '1';
    state.totalLabel = totalLabel;
  }

  return state;
}

function remoteToStateMeasure(remote) {
  const { Label: label, response: { CodeListReference, Datatype } } = remote;
  const state = {};

  if (CodeListReference) {
    state.type = SINGLE_CHOICE;
    state[SINGLE_CHOICE] = ResponseFormatSingle.remoteToState({ responses: [{ Datatype, CodeListReference }] });
  } else {
    state.type = SIMPLE;
    state[SIMPLE] = ResponseFormatSimple.remoteToState({ responses: [{ Datatype }] });
  }
  return {
    label,
    ...state,
  };
}

export function remoteToState(remote, codesListsStore) {
  const { dimensions, responses } = remote;
  const state = {};

  // Dimensions
  const dimensionSecondaryModel = getDimensionsByType(SECONDARY, dimensions);
  const dimensionPrimaryModel = getDimensionsByType(PRIMARY, dimensions);
  const dimensionMeasuresModel = getDimensionsMeasures(dimensions);

  // Primary and secondary state
  state[PRIMARY] = remoteToStatePrimary(dimensionPrimaryModel);

  if (dimensionSecondaryModel) {
    state[SECONDARY] = remoteToStateSecondary(dimensionSecondaryModel);
  }

  // Measures
  const responsesOffset = getResponsesOffset(state[PRIMARY], state[SECONDARY], codesListsStore);
  const responsesMeasuresModel = getMeasuresModel(responses, dimensionMeasuresModel, responsesOffset);

  if (dimensionSecondaryModel) {
    state[MEASURE] = remoteToStateMeasure(responsesMeasuresModel[0]);
  } else {
    state[LIST_MEASURE] = responsesMeasuresModel.map(m => remoteToStateMeasure(m));
  }

  return state;
}

// STATE TO REMOTE

function stateToRemoteResponse(state) {
  const { type: measureType, [measureType]: measureTypeState, collectedVariable } = state;
  let model = {};

  if (measureType === SIMPLE) {
    const { mandatory, type: typeName, [typeName]: simpleState } = measureTypeState;
    model = Response.stateToRemote({ mandatory, typeName, ...simpleState, collectedVariable });
  } else {
    const { mandatory, visHint, [DEFAULT_CODES_LIST_SELECTOR_PATH]: { id: codesListId } } = measureTypeState;
    model = Response.stateToRemote({
      mandatory,
      codesListId,
      typeName: TEXT,
      maxLength: 1,
      pattern: '',
      visHint,
      collectedVariable,
    });
  }

  return model;
}

export function stateToRemote(state, collectedVariables, codesListsStore) {
  let i;
  let j;
  const {
    [PRIMARY]: primaryState,
    [SECONDARY]: secondaryState,
    [MEASURE]: measureState,
    [LIST_MEASURE]: listMeasuresState,
  } = state;
  const { type, [type]: { type: typePrimaryCodesList, ...primaryTypeState }, ...totalLabelPrimaryState } = primaryState;
  const dimensionsModel = [];
  const responsesModel = [];
  const responsesOffset = getResponsesOffset(primaryState, secondaryState, codesListsStore);

  // Primary and secondary dimension
  dimensionsModel.push(Dimension.stateToRemote({ type: PRIMARY, ...primaryTypeState, ...totalLabelPrimaryState }));

  if (secondaryState) {
    const { type: typeSecondaryCodesList, ...secondaryTypeState } = secondaryState;
    dimensionsModel.push(Dimension.stateToRemote({ type: SECONDARY, ...secondaryTypeState }));
  }

  // Measures dimensions
  if (measureState) {
    dimensionsModel.push(Dimension.stateToRemote({ type: MEASURE, label: measureState.label }));

    for (i = 0; i < responsesOffset; i += 1) {
      responsesModel.push(
        stateToRemoteResponse({
          ...measureState,
          collectedVariable: collectedVariables[i] || '',
        })
      );
    }
  } else {
    for (i = 0; i < listMeasuresState.length; i += 1) {
      dimensionsModel.push(Dimension.stateToRemote({ type: MEASURE, label: listMeasuresState[i].label }));
    }
    for (i = 0; i < responsesOffset; i += 1) {
      for (j = 0; j < listMeasuresState.length; j += 1) {
        responsesModel.push(
          stateToRemoteResponse({
            ...listMeasuresState[j],
            collectedVariable: collectedVariables[i * listMeasuresState.length + j] || '',
          })
        );
      }
    }
  }

  return {
    Dimension: dimensionsModel,
    Response: responsesModel,
  };
}