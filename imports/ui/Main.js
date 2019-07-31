import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'

import { Bikes } from '../api/bikes/collection.js'

const Detail = withTracker(({ bike }) => {
  const handle = Meteor.subscribe('bikes', bike)
  const doc = Bikes.findOne(bike)
  console.log(doc)
  return { loading: !handle.ready(), ...doc }
})(({ loading, type, gears, color }) => (
  <article className={'container'}>
    <h2>{loading ? 'Loading' : type}</h2>
    {loading ? null : (
      <dl>
        <dt>Color</dt>
        <dd>{color}</dd>
        <dt>Gears</dt>
        <dd>
          <dl>
            <dt>Front</dt>
            <dd>{gears.front}</dd>
            <dt>Rear</dt>
            <dd>{gears.rear}</dd>
          </dl>
        </dd>
      </dl>
    )}
  </article>
))

const List = withTracker(() => {
  const handle = Meteor.subscribe(
    'bikes',
    {},
    { fields: { type: 1, 'gears.rear': 1 } }
  )
  const bikes = Bikes.find().fetch()
  return { loading: !handle.ready(), bikes }
})(({ bike, bikes, loading, onSelect }) => (
  <ul>
    {loading ? (
      <li>loading</li>
    ) : (
      bikes.map(({ _id, type, gears }, i) => (
        <li
          key={i}
          onClick={() => onSelect(_id)}
          className={bike === _id ? 'checked' : ''}
        >
          <h3>{type}</h3>
          <small>{gears.rear}</small>
        </li>
      ))
    )}
  </ul>
))

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { bike: null }
  }
  render () {
    const { bike } = this.state
    return (
      <section>
        <header>
          <h1>Bikes</h1>
        </header>
        <List onSelect={bike => this.setState({ bike })} bike={bike} />
        {bike ? <Detail bike={bike} /> : null}
      </section>
    )
  }
}

export default Main
