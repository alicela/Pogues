export const componentsStore = {
  SEQUENCE1: {
    id: 'SEQUENCE1',
    name: 'S1',
    parent: 'QUESTIONNAIRE',
    weight: 0,
    children: ['QUESTION5', 'SUBSEQUENCE1'],
    label: 'S1',
    type: 'SEQUENCE'
  },
  QUESTION5: {
    id: 'QUESTION5',
    name: 'Q5',
    parent: 'SEQUENCE1',
    weight: 0,
    children: [],
    type: 'QUESTION',
    label: 'Q5\n'
  },
  SUBSEQUENCE1: {
    id: 'SUBSEQUENCE1',
    name: 'SS1',
    parent: 'SEQUENCE1',
    weight: 1,
    children: ['QUESTION1'],
    label: 'SS1',
    type: 'SUBSEQUENCE'
  },
  QUESTION1: {
    id: 'QUESTION1',
    name: 'Q1',
    parent: 'SUBSEQUENCE1',
    weight: 0,
    children: [],
    type: 'QUESTION',
    label: 'Q1\n'
  },
  SEQUENCE2: {
    id: 'SEQUENCE2',
    name: 'S2',
    parent: 'QUESTIONNAIRE',
    weight: 1,
    children: ['SUBSEQUENCE2'],
    label: 'S2',
    type: 'SEQUENCE'
  },
  SUBSEQUENCE2: {
    id: 'SUBSEQUENCE2',
    name: 'SS2',
    parent: 'SEQUENCE2',
    weight: 0,
    children: ['QUESTION2', 'QUESTION3'],
    label: 'SS2',
    type: 'SUBSEQUENCE'
  },
  QUESTION2: {
    id: 'QUESTION2',
    name: 'Q2',
    parent: 'SUBSEQUENCE2',
    weight: 0,
    children: [],
    type: 'QUESTION',
    label: 'Q2\n'
  },
  QUESTION3: {
    id: 'QUESTION3',
    name: 'Q3',
    parent: 'SUBSEQUENCE2',
    weight: 1,
    children: [],
    type: 'QUESTION',
    label: 'Q3\n'
  },
  QUESTIONNAIRE: {
    id: 'QUESTIONNAIRE',
    name: 'QUESTIONNA',
    parent: '',
    weight: 0,
    children: ['SEQUENCE1', 'SEQUENCE2'],
    label: 'Questionnaire',
    type: 'QUESTIONNAIRE'
  }
};

export const listGotos = [
  {
    value: 'SEQUENCE1',
    depth: 0,
    label: 'S1 - S1',
    disabled: false
  },
  {
    value: 'QUESTION5',
    depth: 1,
    label: 'Q5 - Q5',
    disabled: false
  },
  {
    value: 'SUBSEQUENCE1',
    depth: 1,
    label: 'SS1 - SS1',
    disabled: false
  },
  {
    value: 'QUESTION1',
    depth: 2,
    label: 'Q1 - Q1',
    disabled: false
  },
  {
    value: 'SEQUENCE2',
    depth: 0,
    label: 'S2 - S2',
    disabled: false
  },
  {
    value: 'SUBSEQUENCE2',
    depth: 1,
    label: 'SS2 - SS2',
    disabled: false
  },
  {
    value: 'QUESTION2',
    depth: 2,
    label: 'Q2 - Q2',
    disabled: false
  },
  {
    value: 'QUESTION3',
    depth: 2,
    label: 'Q3 - Q3',
    disabled: false
  }
];
