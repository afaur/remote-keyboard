import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { KeyboardGame, KeyboardSymbolic, KeyboardNumeric, KeyboardUpperCase, KeyboardLowerCase } from './components/all.js'

require('../css/style.scss')

const KeyboardComponents = {
  gamepad: KeyboardGame,
  symbolic: KeyboardSymbolic,
  numeric: KeyboardNumeric,
  upper: KeyboardUpperCase,
  lower: KeyboardLowerCase,
}

class Style extends Component {
  render () {
    return React.createElement(
      'style',
      null,
      this.props.css
    )
  }
}

class KeyboardContainer extends Component {

  constructor (props) {
    super(props)
    fetch('/login', { method: 'POST', credentials: 'same-origin' })
      .then((response) => {
        this.ws = new WebSocket(`ws://${window.location.host}`)
        return response.ok
          ? response.json().then((data) => JSON.stringify(data, null, 2))
          : Promise.reject(new Error('Unexpected response'));
      })
      .then(() => {
        console.log('logged in')
      })
      .catch((err) => {
        console.log(err.message)
      })
      this.state = {
        shift: false,
        symbolic: false,
      }
  }

  handleWsOpen = () => {
    console.log('WebSocket open')
  }

  handleWsClose = () => {
    console.log('WebSocket close')
  }

  handleWsError = () => {
    console.log('WebSocket error')
  }

  handleTouchStart = (value) => {
    if (value === 'shift') {
      this.setState({
        shift: !this.state.shift,
      })
    } else if (value === 'numeric') {
      this.setState({
        numeric: !this.state.numeric,
      })
    } else {
      this.ws.send(
        JSON.stringify({
          type: 'start',
          key: value,
        })
      )
      if (!this.state.numeric) {
        this.setState({
          shift: false,
        })
      }
    }
  }

  handleTouchEnd = (value) => {
    if (value !== 'shift' || value !== 'numeric') {
      this.ws.send(
        JSON.stringify({
          type: 'end',
          key: value,
        })
      )
    }
  }

  getKeyboard = () => {
    let state = this.state
    if (state.numeric && state.shift) return 'symbolic'
    if (state.numeric) return 'numeric'
    if (state.shift) return 'upper'
    return 'lower'
  }

  render () {
    const css = `
      .keyboard {
        width: 600px;
        margin: 0 auto;
        text-align: center;
        font-family: monospace;
      }
      .keyboard .row span {
        display: inline-block;
        border: 1px solid black;
        padding: 10px 15px;
        margin: 5px;
      }
    `

    // Temporarily only use gamepad
    //const CurrentKeyboard = KeyboardComponents[this.getKeyboard()]
    const CurrentKeyboard = KeyboardComponents['gamepad']

    return (
      <div>
        <Style css={css} />
        <CurrentKeyboard
          handleTouchStart={this.handleTouchStart}
          handleTouchEnd={this.handleTouchEnd}
        />
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class Home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
    }
  }

  render() {
    return (
      <div className='home'>
        <div id='control-wrapper'>
          <KeyboardContainer />
        </div>
      </div>
    )
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
)

render(routes, document.getElementById('react'))
