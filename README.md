# Subscription Test

This repository is a demonstration that simultaneous subscriptions with different [mongo projections](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/) for nested fields can lead to unexpected data.

Each item in the Bikes collection has the following structure:

```JSON
{
  "_id": "_id_",
  "type": "Type",
  "gears": {
    "front": "54",
    "rear": "16"
  },
  "color": "Color"
}
```

## 1. The List

A list of all bike records is shown. This list has the following subscription with field projection:

```JS
Meteor.subscribe('bikes', {}, { fields: { type: 1, 'gears.rear': 1 } })
```

_Note that from `gears` only one nested field will be fetched._

## 2. The Detail page

When you click on one list item, a new subscription is started without field projection to get the whole document:

```JS
Meteor.subscribe('bikes', _id)
```

### Expected result

All top-level and nested fields are be fetched from the database.

### Actual result

1. All top-level fields are fetched, including `color` which was not fetched for the list.
1. The nested fields are subset to the ones specified in the subscription for the list: `gears.front` is not fetched.
