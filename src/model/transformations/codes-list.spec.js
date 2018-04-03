import {
  remoteToCodesState,
  remoteToStore,
  remoteToState,
  storeToRemote
} from './codes-list';

describe('codes list tranformations', () => {
  describe('remoteToCodesState', () => {
    test('should return the state representation of a codelist', () => {
      const input = [
        { Parent: '', Label: 'Frozen products', Value: 'A' },
        { Parent: 'A', Label: 'Ice creams', Value: 'A1' },
        { Parent: 'A', Label: 'Jasper Beardly', Value: 'A2' },
        { Parent: '', Label: 'Meat', Value: 'B' },
        { Parent: 'B', Label: 'Bacon', Value: 'B1' },
        { Parent: 'B', Label: 'Pork chop', Value: 'B2' },
        { Parent: 'B', Label: 'Chicken', Value: 'B3' },
        { Value: 'C', Label: 'Compote', Parent: '' },
        { Value: 'C1', Label: 'Powersauce', Parent: 'C' },
        { Parent: '', Label: 'Other', Value: 'D' }
      ];
      const output = {
        A: {
          value: 'A',
          label: 'Frozen products',
          parent: '',
          depth: 1,
          weight: 1
        },
        A1: {
          value: 'A1',
          label: 'Ice creams',
          parent: 'A',
          depth: 2,
          weight: 1
        },
        A2: {
          value: 'A2',
          label: 'Jasper Beardly',
          parent: 'A',
          depth: 2,
          weight: 2
        },
        B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
        B1: { value: 'B1', label: 'Bacon', parent: 'B', depth: 2, weight: 1 },
        B2: {
          value: 'B2',
          label: 'Pork chop',
          parent: 'B',
          depth: 2,
          weight: 2
        },
        B3: { value: 'B3', label: 'Chicken', parent: 'B', depth: 2, weight: 3 },
        C: { value: 'C', label: 'Compote', parent: '', depth: 1, weight: 3 },
        C1: {
          value: 'C1',
          label: 'Powersauce',
          parent: 'C',
          depth: 2,
          weight: 1
        },
        D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 }
      };
      expect(remoteToCodesState(input)).toEqual(output);
    });
  });
  describe('remoteToStore', () => {
    test('should return the store representation of a codelist', () => {
      const input = [
        {
          Label: 'TOWN',
          id: 'j334iumu',
          Code: [
            { Parent: '', Label: 'Springfield', Value: '00001' },
            { Parent: '', Label: 'Shelbyville', Value: '00002' },
            { Parent: '', Label: 'Seinfeld', Value: '00003' }
          ],
          Name: ''
        },
        {
          Label: 'MAYOR',
          id: 'j6qdqoen',
          Code: [
            { Parent: '', Label: 'Constance Harm', Value: '1' },
            { Parent: '', Label: 'Timothy Lovejoy', Value: '2' },
            { Parent: '', Label: 'Joe Quimby', Value: '3' },
            { Parent: '', Label: 'Poochie', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'State',
          id: 'j4nwo00f',
          Code: [
            { Parent: '', Label: 'Washington', Value: '1' },
            { Parent: '', Label: 'Kentucky', Value: '2' },
            { Parent: '', Label: 'Ohio', Value: '3' },
            { Parent: '', Label: 'Maine', Value: '4' },
            { Parent: '', Label: 'North Dakota', Value: '5' },
            { Parent: '', Label: 'Florida', Value: '6' },
            { Parent: '', Label: 'North Takoma', Value: '7' },
            { Parent: '', Label: 'California', Value: '8' },
            { Parent: '', Label: 'Texas', Value: '9' },
            { Parent: '', Label: 'Massachusetts', Value: '10' },
            { Parent: '', Label: 'Nevada', Value: '11' },
            { Parent: '', Label: 'Illinois', Value: '12' },
            { Parent: '', Label: 'Not in any state, you fool!', Value: '13' }
          ],
          Name: ''
        },
        {
          Label: 'ANIMALS',
          id: 'j335cu3c',
          Code: [
            { Parent: '', Label: "Santa's Little Helper", Value: '1' },
            { Parent: '', Label: 'Snowball I', Value: '2' },
            { Parent: '', Label: 'Coltrane', Value: '3' },
            { Parent: '', Label: 'Mojo the Helper Monkey', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'Flavours',
          id: 'j6p2mvca',
          Code: [
            { Parent: '', Label: 'Vanilla', Value: '1' },
            { Parent: '', Label: 'Strawberry', Value: '2' },
            { Parent: '', Label: 'Apple', Value: '3' },
            { Parent: '', Label: 'Bacon', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'YESNO',
          id: 'jbdxh138',
          Code: [
            { Parent: '', Label: 'Yes', Value: '1' },
            { Parent: '', Label: 'No', Value: '0' }
          ],
          Name: ''
        },
        {
          Label: 'NUCLEAR_CHARACTERS',
          id: 'j6qeytgc',
          Code: [
            { Parent: '', Label: 'Charles Montgomery Burns', Value: '1' },
            { Parent: '', Label: 'Carl Carlson', Value: '2' },
            { Parent: '', Label: 'Otto Mann', Value: '3' },
            { Parent: '', Label: 'Carl Carlson', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'BIRTH_CHARACTER',
          id: 'j6z087mq',
          Code: [
            { Parent: '', Label: 'Selma Bouvier', Value: '1' },
            { Parent: '', Label: 'Kent Brockman', Value: '2' },
            { Parent: '', Label: 'Milhouse Van Houten', Value: '3' },
            { Parent: '', Label: 'Nelson Muntz', Value: '4' },
            { Parent: '', Label: 'Crazy Cat Lady', Value: '5' }
          ],
          Name: ''
        },
        {
          Label: 'CITY_BIRTH',
          id: 'jbdxricm',
          Code: [
            { Parent: '', Label: 'Albuquerque', Value: '1' },
            { Parent: '', Label: 'Springfield', Value: '2' },
            { Parent: '', Label: 'Portland', Value: '3' },
            { Parent: '', Label: 'Shelbyville', Value: '4' },
            { Parent: '', Label: 'Dagstuhl', Value: '5' }
          ],
          Name: ''
        },
        {
          Label: 'Products',
          id: 'j4nwh16i',
          Code: [
            { Parent: '', Label: 'Frozen products', Value: 'A' },
            { Parent: 'A', Label: 'Ice creams', Value: 'A1' },
            { Parent: 'A', Label: 'Jasper Beardly', Value: 'A2' },
            { Parent: '', Label: 'Meat', Value: 'B' },
            { Parent: 'B', Label: 'Bacon', Value: 'B1' },
            { Parent: 'B', Label: 'Pork chop', Value: 'B2' },
            { Parent: 'B', Label: 'Chicken', Value: 'B3' },
            { Value: 'C', Label: 'Compote', Parent: '' },
            { Value: 'C1', Label: 'Powersauce', Parent: 'C' },
            { Parent: '', Label: 'Other', Value: 'D' }
          ],
          Name: ''
        },
        {
          Label: 'Clownings',
          id: 'j77dav9b',
          Code: [
            {
              Parent: '',
              Label: '***Break the windows of the whole city***',
              Value: '1'
            },
            {
              Parent: '',
              Label: '***Loose the violin of his daughter playing poker***',
              Value: '2'
            },
            { Parent: '', Label: '***Kill Mr Burns***', Value: '3' },
            {
              Parent: '',
              Label:
                '***Leaving a mechanical object to control the nuclear power plant***',
              Value: '4'
            }
          ],
          Name: ''
        },
        {
          Label: 'Clowning_Characters',
          id: 'jbdyh6b5',
          Code: [
            { Parent: '', Label: 'Jay', Value: '1' },
            { Parent: '', Label: 'Bart', Value: '2' },
            { Parent: '', Label: 'Krusty the clown', Value: '3' },
            { Parent: '', Label: 'Maggie', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'Means of transport',
          id: 'j6p2kivg',
          Code: [
            { Parent: '', Label: 'Car', Value: '1' },
            { Parent: '', Label: 'Bike', Value: '2' },
            { Parent: '', Label: 'Skateboard', Value: '3' },
            { Parent: '', Label: 'Plane', Value: '4' }
          ],
          Name: ''
        },
        {
          Label: 'Country',
          id: 'jbdye1wa',
          Code: [
            { Parent: '', Label: 'Brazil', Value: '1' },
            { Parent: '', Label: 'Canada', Value: '2' },
            { Parent: '', Label: 'Japan', Value: '3' },
            { Parent: '', Label: 'France', Value: '4' },
            {
              Parent: '',
              Label: '[Other country](. "Included principalities")',
              Value: '5'
            },
            { Parent: '', Label: 'Other planet', Value: '6' }
          ],
          Name: ''
        }
      ];

      const output = {
        j334iumu: {
          id: 'j334iumu',
          label: 'TOWN',
          codes: {
            '00001': {
              value: '00001',
              label: 'Springfield',
              parent: '',
              depth: 1,
              weight: 1
            },
            '00002': {
              value: '00002',
              label: 'Shelbyville',
              parent: '',
              depth: 1,
              weight: 2
            },
            '00003': {
              value: '00003',
              label: 'Seinfeld',
              parent: '',
              depth: 1,
              weight: 3
            }
          },
          name: ''
        },
        j6qdqoen: {
          id: 'j6qdqoen',
          label: 'MAYOR',
          codes: {
            '1': {
              value: '1',
              label: 'Constance Harm',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Timothy Lovejoy',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Joe Quimby',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Poochie',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j4nwo00f: {
          id: 'j4nwo00f',
          label: 'State',
          codes: {
            '1': {
              value: '1',
              label: 'Washington',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Kentucky',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': { value: '3', label: 'Ohio', parent: '', depth: 1, weight: 3 },
            '4': {
              value: '4',
              label: 'Maine',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'North Dakota',
              parent: '',
              depth: 1,
              weight: 5
            },
            '6': {
              value: '6',
              label: 'Florida',
              parent: '',
              depth: 1,
              weight: 6
            },
            '7': {
              value: '7',
              label: 'North Takoma',
              parent: '',
              depth: 1,
              weight: 7
            },
            '8': {
              value: '8',
              label: 'California',
              parent: '',
              depth: 1,
              weight: 8
            },
            '9': {
              value: '9',
              label: 'Texas',
              parent: '',
              depth: 1,
              weight: 9
            },
            '10': {
              value: '10',
              label: 'Massachusetts',
              parent: '',
              depth: 1,
              weight: 10
            },
            '11': {
              value: '11',
              label: 'Nevada',
              parent: '',
              depth: 1,
              weight: 11
            },
            '12': {
              value: '12',
              label: 'Illinois',
              parent: '',
              depth: 1,
              weight: 12
            },
            '13': {
              value: '13',
              label: 'Not in any state, you fool!',
              parent: '',
              depth: 1,
              weight: 13
            }
          },
          name: ''
        },
        j335cu3c: {
          id: 'j335cu3c',
          label: 'ANIMALS',
          codes: {
            '1': {
              value: '1',
              label: "Santa's Little Helper",
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Snowball I',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Coltrane',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Mojo the Helper Monkey',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6p2mvca: {
          id: 'j6p2mvca',
          label: 'Flavours',
          codes: {
            '1': {
              value: '1',
              label: 'Vanilla',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Strawberry',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Apple',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': { value: '4', label: 'Bacon', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        jbdxh138: {
          id: 'jbdxh138',
          label: 'YESNO',
          codes: {
            '0': { value: '0', label: 'No', parent: '', depth: 1, weight: 2 },
            '1': { value: '1', label: 'Yes', parent: '', depth: 1, weight: 1 }
          },
          name: ''
        },
        j6qeytgc: {
          id: 'j6qeytgc',
          label: 'NUCLEAR_CHARACTERS',
          codes: {
            '1': {
              value: '1',
              label: 'Charles Montgomery Burns',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Carl Carlson',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Otto Mann',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Carl Carlson',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6z087mq: {
          id: 'j6z087mq',
          label: 'BIRTH_CHARACTER',
          codes: {
            '1': {
              value: '1',
              label: 'Selma Bouvier',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Kent Brockman',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Milhouse Van Houten',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Nelson Muntz',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'Crazy Cat Lady',
              parent: '',
              depth: 1,
              weight: 5
            }
          },
          name: ''
        },
        jbdxricm: {
          id: 'jbdxricm',
          label: 'CITY_BIRTH',
          codes: {
            '1': {
              value: '1',
              label: 'Albuquerque',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Springfield',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Portland',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Shelbyville',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'Dagstuhl',
              parent: '',
              depth: 1,
              weight: 5
            }
          },
          name: ''
        },
        j4nwh16i: {
          id: 'j4nwh16i',
          label: 'Products',
          codes: {
            A: {
              value: 'A',
              label: 'Frozen products',
              parent: '',
              depth: 1,
              weight: 1
            },
            A1: {
              value: 'A1',
              label: 'Ice creams',
              parent: 'A',
              depth: 2,
              weight: 1
            },
            A2: {
              value: 'A2',
              label: 'Jasper Beardly',
              parent: 'A',
              depth: 2,
              weight: 2
            },
            B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
            B1: {
              value: 'B1',
              label: 'Bacon',
              parent: 'B',
              depth: 2,
              weight: 1
            },
            B2: {
              value: 'B2',
              label: 'Pork chop',
              parent: 'B',
              depth: 2,
              weight: 2
            },
            B3: {
              value: 'B3',
              label: 'Chicken',
              parent: 'B',
              depth: 2,
              weight: 3
            },
            C: {
              value: 'C',
              label: 'Compote',
              parent: '',
              depth: 1,
              weight: 3
            },
            C1: {
              value: 'C1',
              label: 'Powersauce',
              parent: 'C',
              depth: 2,
              weight: 1
            },
            D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        j77dav9b: {
          id: 'j77dav9b',
          label: 'Clownings',
          codes: {
            '1': {
              value: '1',
              label: '***Break the windows of the whole city***',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: '***Loose the violin of his daughter playing poker***',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: '***Kill Mr Burns***',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label:
                '***Leaving a mechanical object to control the nuclear power plant***',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        jbdyh6b5: {
          id: 'jbdyh6b5',
          label: 'Clowning_Characters',
          codes: {
            '1': { value: '1', label: 'Jay', parent: '', depth: 1, weight: 1 },
            '2': { value: '2', label: 'Bart', parent: '', depth: 1, weight: 2 },
            '3': {
              value: '3',
              label: 'Krusty the clown',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Maggie',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6p2kivg: {
          id: 'j6p2kivg',
          label: 'Means of transport',
          codes: {
            '1': { value: '1', label: 'Car', parent: '', depth: 1, weight: 1 },
            '2': { value: '2', label: 'Bike', parent: '', depth: 1, weight: 2 },
            '3': {
              value: '3',
              label: 'Skateboard',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': { value: '4', label: 'Plane', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        jbdye1wa: {
          id: 'jbdye1wa',
          label: 'Country',
          codes: {
            '1': {
              value: '1',
              label: 'Brazil',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Canada',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Japan',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'France',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: '[Other country](. "Included principalities")',
              parent: '',
              depth: 1,
              weight: 5
            },
            '6': {
              value: '6',
              label: 'Other planet',
              parent: '',
              depth: 1,
              weight: 6
            }
          },
          name: ''
        }
      };
      expect(remoteToStore(input)).toEqual(output);
    });
  });
  describe('remoteToState', () => {
    test('should return the state version of the store', () => {
      expect(remoteToState({ store: true })).toEqual({ id: { store: true } });
    });
  });
  describe('storeToRemote', () => {
    test('should return the remote representation of a codelist', () => {
      const input = {
        j334iumu: {
          id: 'j334iumu',
          label: 'TOWN',
          codes: {
            '00001': {
              value: '00001',
              label: 'Springfield',
              parent: '',
              depth: 1,
              weight: 1
            },
            '00002': {
              value: '00002',
              label: 'Shelbyville',
              parent: '',
              depth: 1,
              weight: 2
            },
            '00003': {
              value: '00003',
              label: 'Seinfeld',
              parent: '',
              depth: 1,
              weight: 3
            }
          },
          name: ''
        },
        j6qdqoen: {
          id: 'j6qdqoen',
          label: 'MAYOR',
          codes: {
            '1': {
              value: '1',
              label: 'Constance Harm',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Timothy Lovejoy',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Joe Quimby',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Poochie',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j4nwo00f: {
          id: 'j4nwo00f',
          label: 'State',
          codes: {
            '1': {
              value: '1',
              label: 'Washington',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Kentucky',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': { value: '3', label: 'Ohio', parent: '', depth: 1, weight: 3 },
            '4': {
              value: '4',
              label: 'Maine',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'North Dakota',
              parent: '',
              depth: 1,
              weight: 5
            },
            '6': {
              value: '6',
              label: 'Florida',
              parent: '',
              depth: 1,
              weight: 6
            },
            '7': {
              value: '7',
              label: 'North Takoma',
              parent: '',
              depth: 1,
              weight: 7
            },
            '8': {
              value: '8',
              label: 'California',
              parent: '',
              depth: 1,
              weight: 8
            },
            '9': {
              value: '9',
              label: 'Texas',
              parent: '',
              depth: 1,
              weight: 9
            },
            '10': {
              value: '10',
              label: 'Massachusetts',
              parent: '',
              depth: 1,
              weight: 10
            },
            '11': {
              value: '11',
              label: 'Nevada',
              parent: '',
              depth: 1,
              weight: 11
            },
            '12': {
              value: '12',
              label: 'Illinois',
              parent: '',
              depth: 1,
              weight: 12
            },
            '13': {
              value: '13',
              label: 'Not in any state, you fool!',
              parent: '',
              depth: 1,
              weight: 13
            }
          },
          name: ''
        },
        j335cu3c: {
          id: 'j335cu3c',
          label: 'ANIMALS',
          codes: {
            '1': {
              value: '1',
              label: "Santa's Little Helper",
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Snowball I',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Coltrane',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Mojo the Helper Monkey',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6p2mvca: {
          id: 'j6p2mvca',
          label: 'Flavours',
          codes: {
            '1': {
              value: '1',
              label: 'Vanilla',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Strawberry',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Apple',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': { value: '4', label: 'Bacon', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        jbdxh138: {
          id: 'jbdxh138',
          label: 'YESNO',
          codes: {
            '0': { value: '0', label: 'No', parent: '', depth: 1, weight: 2 },
            '1': { value: '1', label: 'Yes', parent: '', depth: 1, weight: 1 }
          },
          name: ''
        },
        j6qeytgc: {
          id: 'j6qeytgc',
          label: 'NUCLEAR_CHARACTERS',
          codes: {
            '1': {
              value: '1',
              label: 'Charles Montgomery Burns',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Carl Carlson',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Otto Mann',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Carl Carlson',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6z087mq: {
          id: 'j6z087mq',
          label: 'BIRTH_CHARACTER',
          codes: {
            '1': {
              value: '1',
              label: 'Selma Bouvier',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Kent Brockman',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Milhouse Van Houten',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Nelson Muntz',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'Crazy Cat Lady',
              parent: '',
              depth: 1,
              weight: 5
            }
          },
          name: ''
        },
        jbdxricm: {
          id: 'jbdxricm',
          label: 'CITY_BIRTH',
          codes: {
            '1': {
              value: '1',
              label: 'Albuquerque',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Springfield',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Portland',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Shelbyville',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: 'Dagstuhl',
              parent: '',
              depth: 1,
              weight: 5
            }
          },
          name: ''
        },
        j4nwh16i: {
          id: 'j4nwh16i',
          label: 'Products',
          codes: {
            A: {
              value: 'A',
              label: 'Frozen products',
              parent: '',
              depth: 1,
              weight: 1
            },
            A1: {
              value: 'A1',
              label: 'Ice creams',
              parent: 'A',
              depth: 2,
              weight: 1
            },
            A2: {
              value: 'A2',
              label: 'Jasper Beardly',
              parent: 'A',
              depth: 2,
              weight: 2
            },
            B: { value: 'B', label: 'Meat', parent: '', depth: 1, weight: 2 },
            B1: {
              value: 'B1',
              label: 'Bacon',
              parent: 'B',
              depth: 2,
              weight: 1
            },
            B2: {
              value: 'B2',
              label: 'Pork chop',
              parent: 'B',
              depth: 2,
              weight: 2
            },
            B3: {
              value: 'B3',
              label: 'Chicken',
              parent: 'B',
              depth: 2,
              weight: 3
            },
            C: {
              value: 'C',
              label: 'Compote',
              parent: '',
              depth: 1,
              weight: 3
            },
            C1: {
              value: 'C1',
              label: 'Powersauce',
              parent: 'C',
              depth: 2,
              weight: 1
            },
            D: { value: 'D', label: 'Other', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        j77dav9b: {
          id: 'j77dav9b',
          label: 'Clownings',
          codes: {
            '1': {
              value: '1',
              label: '***Break the windows of the whole city***',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: '***Loose the violin of his daughter playing poker***',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: '***Kill Mr Burns***',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label:
                '***Leaving a mechanical object to control the nuclear power plant***',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        jbdyh6b5: {
          id: 'jbdyh6b5',
          label: 'Clowning_Characters',
          codes: {
            '1': { value: '1', label: 'Jay', parent: '', depth: 1, weight: 1 },
            '2': { value: '2', label: 'Bart', parent: '', depth: 1, weight: 2 },
            '3': {
              value: '3',
              label: 'Krusty the clown',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'Maggie',
              parent: '',
              depth: 1,
              weight: 4
            }
          },
          name: ''
        },
        j6p2kivg: {
          id: 'j6p2kivg',
          label: 'Means of transport',
          codes: {
            '1': { value: '1', label: 'Car', parent: '', depth: 1, weight: 1 },
            '2': { value: '2', label: 'Bike', parent: '', depth: 1, weight: 2 },
            '3': {
              value: '3',
              label: 'Skateboard',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': { value: '4', label: 'Plane', parent: '', depth: 1, weight: 4 }
          },
          name: ''
        },
        jbdye1wa: {
          id: 'jbdye1wa',
          label: 'Country',
          codes: {
            '1': {
              value: '1',
              label: 'Brazil',
              parent: '',
              depth: 1,
              weight: 1
            },
            '2': {
              value: '2',
              label: 'Canada',
              parent: '',
              depth: 1,
              weight: 2
            },
            '3': {
              value: '3',
              label: 'Japan',
              parent: '',
              depth: 1,
              weight: 3
            },
            '4': {
              value: '4',
              label: 'France',
              parent: '',
              depth: 1,
              weight: 4
            },
            '5': {
              value: '5',
              label: '[Other country](. "Included principalities")',
              parent: '',
              depth: 1,
              weight: 5
            },
            '6': {
              value: '6',
              label: 'Other planet',
              parent: '',
              depth: 1,
              weight: 6
            }
          },
          name: ''
        }
      };
      const output = [
        {
          id: 'j334iumu',
          Label: 'TOWN',
          Name: '',
          Code: [
            { Label: 'Springfield', Value: '00001', Parent: '' },
            { Label: 'Shelbyville', Value: '00002', Parent: '' },
            { Label: 'Seinfeld', Value: '00003', Parent: '' }
          ]
        },
        {
          id: 'j6qdqoen',
          Label: 'MAYOR',
          Name: '',
          Code: [
            { Label: 'Constance Harm', Value: '1', Parent: '' },
            { Label: 'Timothy Lovejoy', Value: '2', Parent: '' },
            { Label: 'Joe Quimby', Value: '3', Parent: '' },
            { Label: 'Poochie', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'j4nwo00f',
          Label: 'State',
          Name: '',
          Code: [
            { Label: 'Washington', Value: '1', Parent: '' },
            { Label: 'Kentucky', Value: '2', Parent: '' },
            { Label: 'Ohio', Value: '3', Parent: '' },
            { Label: 'Maine', Value: '4', Parent: '' },
            { Label: 'North Dakota', Value: '5', Parent: '' },
            { Label: 'Florida', Value: '6', Parent: '' },
            { Label: 'North Takoma', Value: '7', Parent: '' },
            { Label: 'California', Value: '8', Parent: '' },
            { Label: 'Texas', Value: '9', Parent: '' },
            { Label: 'Massachusetts', Value: '10', Parent: '' },
            { Label: 'Nevada', Value: '11', Parent: '' },
            { Label: 'Illinois', Value: '12', Parent: '' },
            { Label: 'Not in any state, you fool!', Value: '13', Parent: '' }
          ]
        },
        {
          id: 'j335cu3c',
          Label: 'ANIMALS',
          Name: '',
          Code: [
            { Label: "Santa's Little Helper", Value: '1', Parent: '' },
            { Label: 'Snowball I', Value: '2', Parent: '' },
            { Label: 'Coltrane', Value: '3', Parent: '' },
            { Label: 'Mojo the Helper Monkey', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'j6p2mvca',
          Label: 'Flavours',
          Name: '',
          Code: [
            { Label: 'Vanilla', Value: '1', Parent: '' },
            { Label: 'Strawberry', Value: '2', Parent: '' },
            { Label: 'Apple', Value: '3', Parent: '' },
            { Label: 'Bacon', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'jbdxh138',
          Label: 'YESNO',
          Name: '',
          Code: [
            { Label: 'Yes', Value: '1', Parent: '' },
            { Label: 'No', Value: '0', Parent: '' }
          ]
        },
        {
          id: 'j6qeytgc',
          Label: 'NUCLEAR_CHARACTERS',
          Name: '',
          Code: [
            { Label: 'Charles Montgomery Burns', Value: '1', Parent: '' },
            { Label: 'Carl Carlson', Value: '2', Parent: '' },
            { Label: 'Otto Mann', Value: '3', Parent: '' },
            { Label: 'Carl Carlson', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'j6z087mq',
          Label: 'BIRTH_CHARACTER',
          Name: '',
          Code: [
            { Label: 'Selma Bouvier', Value: '1', Parent: '' },
            { Label: 'Kent Brockman', Value: '2', Parent: '' },
            { Label: 'Milhouse Van Houten', Value: '3', Parent: '' },
            { Label: 'Nelson Muntz', Value: '4', Parent: '' },
            { Label: 'Crazy Cat Lady', Value: '5', Parent: '' }
          ]
        },
        {
          id: 'jbdxricm',
          Label: 'CITY_BIRTH',
          Name: '',
          Code: [
            { Label: 'Albuquerque', Value: '1', Parent: '' },
            { Label: 'Springfield', Value: '2', Parent: '' },
            { Label: 'Portland', Value: '3', Parent: '' },
            { Label: 'Shelbyville', Value: '4', Parent: '' },
            { Label: 'Dagstuhl', Value: '5', Parent: '' }
          ]
        },
        {
          id: 'j4nwh16i',
          Label: 'Products',
          Name: '',
          Code: [
            { Label: 'Frozen products', Value: 'A', Parent: '' },
            { Label: 'Ice creams', Value: 'A1', Parent: 'A' },
            { Label: 'Jasper Beardly', Value: 'A2', Parent: 'A' },
            { Label: 'Meat', Value: 'B', Parent: '' },
            { Label: 'Bacon', Value: 'B1', Parent: 'B' },
            { Label: 'Pork chop', Value: 'B2', Parent: 'B' },
            { Label: 'Chicken', Value: 'B3', Parent: 'B' },
            { Label: 'Compote', Value: 'C', Parent: '' },
            { Label: 'Powersauce', Value: 'C1', Parent: 'C' },
            { Label: 'Other', Value: 'D', Parent: '' }
          ]
        },
        {
          id: 'j77dav9b',
          Label: 'Clownings',
          Name: '',
          Code: [
            {
              Label: '***Break the windows of the whole city***',
              Value: '1',
              Parent: ''
            },
            {
              Label: '***Loose the violin of his daughter playing poker***',
              Value: '2',
              Parent: ''
            },
            { Label: '***Kill Mr Burns***', Value: '3', Parent: '' },
            {
              Label:
                '***Leaving a mechanical object to control the nuclear power plant***',
              Value: '4',
              Parent: ''
            }
          ]
        },
        {
          id: 'jbdyh6b5',
          Label: 'Clowning_Characters',
          Name: '',
          Code: [
            { Label: 'Jay', Value: '1', Parent: '' },
            { Label: 'Bart', Value: '2', Parent: '' },
            { Label: 'Krusty the clown', Value: '3', Parent: '' },
            { Label: 'Maggie', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'j6p2kivg',
          Label: 'Means of transport',
          Name: '',
          Code: [
            { Label: 'Car', Value: '1', Parent: '' },
            { Label: 'Bike', Value: '2', Parent: '' },
            { Label: 'Skateboard', Value: '3', Parent: '' },
            { Label: 'Plane', Value: '4', Parent: '' }
          ]
        },
        {
          id: 'jbdye1wa',
          Label: 'Country',
          Name: '',
          Code: [
            { Label: 'Brazil', Value: '1', Parent: '' },
            { Label: 'Canada', Value: '2', Parent: '' },
            { Label: 'Japan', Value: '3', Parent: '' },
            { Label: 'France', Value: '4', Parent: '' },
            {
              Label: '[Other country](. "Included principalities")',
              Value: '5',
              Parent: ''
            },
            { Label: 'Other planet', Value: '6', Parent: '' }
          ]
        }
      ];

      expect(storeToRemote(input)).toEqual(output);
    });
  });
});