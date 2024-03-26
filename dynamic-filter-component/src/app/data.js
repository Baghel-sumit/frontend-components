
export const allRelations = [
  { label: "All", value: "and" },
  { label: "Any", value: "or" }
]

export const groupObjectTemplate = {
  relation: { label: "All", value: "and" },
  conditions: []
}

export const filtersInitialState = {
  relation: { label: "All", value: "and" },
  groups: [ groupObjectTemplate ]
}



/* 

groupRelations = [ "and", "or" ]

groups = [
  {
    relation: { label: "All", value: "and" },
    conditions: [
      {
        label: "Email id",
        value: "email@example.com",
        variable: "email",
        operator: "starts with"
      }
    ]
  }
]

all functions --

1. onChangeRelation(value, relationIdx)
2. onAddGroup() -> increase groups count by one and add new group into groups array and add new default relation into relations
3. onRemoveGroup(groupIdx) -> decrease groups count by one and remove that index group ( sp. case )
4. onChangeGroupRelation(value, groupIdx) -> change the relation of groupIdx
5. onAddCondition(condition, groupIdx) -> add a condition into groups[groupIdx].conditions.push(condition)
6. onRemoveCondition(groupIdx, conditionIdx) -> remove a condition from groups[groupIdx].conditions

*/

/* 

{
  "entity": "customer/lead/cart/ order any other table",
  "expression": {
    "relation": "and",
    "groups": [
      {
        "relation": "or",
        "conditions": [
          {
            "operator": "start with",
            "variable": "email",
            "value": "gmail.com"
          },
          {
            "operator": "is not",
            "variable": "name",
            "value": "gmail.com"
          }
        ]
      },
      {
        "relation": "and/or",
        "conditions": [
          {
            "operator": "start with",
            "variable": "email",
            "value": "gmail.com"
          }
        ]
      },
      {
        "relation": "and/or",
        "conditions": [
          {
            "operator": "start with",
            "variable": "email",
            "value": "gmail.com",
            "type": "number", // string, number, boolean, enum
            "values": [1, 2],
            "label": "Email"
          }
        ]
      }
    ]
  }
}

*/
