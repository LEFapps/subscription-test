import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import Main from '../imports/ui/Main.js'

Meteor.startup(() => render(<Main />, document.getElementById('main')))
