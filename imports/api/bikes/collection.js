import { Mongo } from 'meteor/mongo'

const Bikes = new Mongo.Collection('bikes')

export { Bikes }
