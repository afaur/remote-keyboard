import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

require('../css/style.scss')

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
        this.ws = new WebSocket(`ws://${location.host}`)
        return response.ok
          ? response.json().then((data) => JSON.stringify(data, null, 2))
          : Promise.reject(new Error('Unexpected response'));
      })
      .then(() => {
        console.log('logged in')
      })
      .catch((err) => { console.log(err.message) })
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

  handleKeystroke = (value) => {
    this.ws.send(value)
  }

  render () {
    const css = `
      .keyboard {
        width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      .keyboard .row span {
        display: inline-block;
        border: 1px solid black;
        padding: 10px 15px;
        margin: 5px;
      }
    `

    return (
      <KeyboardLowerCase handleKeystroke={this.handleKeystroke} />
    )
  }
}

class KeyboardLowerCase extends Component {

  static propTypes = {
    handleKeystroke: React.PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  handleKeystroke = (e) => {
    if (e.target.dataset && e.target.dataset.key) {
      return this.props.handleKeystroke(e.target.dataset.key)
    } else if (e.target.innerText) {
      return this.props.handleKeystroke(e.target.innerText)
    }
    console.warn('Key not found', e.target)
  }

  render () {
    const css = `
      .keyboard {
        width: 600px;
        margin: 0 auto;
        text-align: center;
      }
      .keyboard .row span {
        display: inline-block;
        border: 1px solid black;
        padding: 10px 15px;
        margin: 5px;
      }
    `

    return (
      <div onClick={this.handleKeystroke}
        className='keyboard'>
        <Style css={css} />
        <div className='row'>
          <span>q</span>
          <span>w</span>
          <span>e</span>
          <span>r</span>
          <span>t</span>
          <span>y</span>
          <span>u</span>
          <span>i</span>
          <span>o</span>
          <span>p</span>
        </div>
        <div className='row'>
          <span>a</span>
          <span>s</span>
          <span>d</span>
          <span>f</span>
          <span>g</span>
          <span>h</span>
          <span>j</span>
          <span>k</span>
          <span>l</span>
        </div>
        <div className='row'>
          <span data-key="shift" className='fa fa-arrow-circle-up shift'></span>
          <span>z</span>
          <span>x</span>
          <span>c</span>
          <span>v</span>
          <span>b</span>
          <span>n</span>
          <span>m</span>
          <span data-key="backspace" className='fa fa-arrow-circle-left backspace'></span>
        </div>
        <div className='row'>
          <span className='fa fa-th-list toggle-layout'></span>
          <span data-key="space">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span>.</span>
          <span>,</span>
          <span data-key="enter" className='fa fa-arrow-circle-down enter'></span>
        </div>
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

  componentWillMount () {}

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
