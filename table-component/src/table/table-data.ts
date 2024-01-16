export const allAttributeTypes = [
  {
    key: 'string',
    value: 'string',
    label: 'String',
    conditions: ['Contains', 'Not Contains', 'Begins with', 'Exists', 'Not exists']
  },
  {
    key: 'binary',
    value: 'binary',
    label: 'Binary',
    conditions: ['Exists', 'Not exists', 'equal to', 'not equal to', 'Exists', 'Not exists']
  },
  {
    key: 'boolean',
    value: 'boolean',
    label: 'Boolean',
    conditions: ['Exists', 'Not exists', 'Equal to', 'Not equal to']
  },
  {
    key: 'number',
    value: 'number',
    label: 'Number',
    conditions: ['Equal to', 'Not equal to', 'Less than or equal to', 'Less than', 'Greater than or equal to','Greater than', 'Between', 'Exists', 'Not exists']
  },
  {
    key: 'null',
    value: 'null',
    label: 'Null',
    conditions: ['Exists', 'Not exists', 'Equal to', 'Not equal to']
  }
];