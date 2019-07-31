import { Meteor } from 'meteor/meteor'
import { EJSON } from 'meteor/ejson'

import { Bikes } from './collection'

const getBikes = (query = {}, options = {}) => Bikes.find(query, options)

Meteor.startup(() => {
  Bikes.remove({})
  const bikes = EJSON.parse(Assets.getText('bikes.json'))
  bikes.forEach(bike => {
    Bikes.insert(bike)
  })
})

Meteor.publish('bikes', getBikes)

// Meteor.methods({
//   getBikeIds: (q, p) => getBikes(q, p).map(({ _id }) => _id),
//   getBikesTotal: (q, p) => getBikes(q, p).count()
// })

export { Bikes }
