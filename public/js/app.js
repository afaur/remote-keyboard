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
    document.addEventListener('touchstart', (e) => {
      e.preventDefault()
      e.target.click()
    })
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
    if (value === 'shift') {
      this.setState({
        shift: !this.state.shift,
      })
    } else if (value === 'symbolic') {
      this.setState({
        symbolic: !this.state.symbolic,
      })
    } else {
      this.ws.send(value)
      if (!this.state.symbolic) {
        this.setState({
          shift: false,
        })
      }
    }
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

    return (
      <div>
        <Style css={css} />
        {
          this.state.symbolic &&
            this.state.shift && 
            <KeyboardSymbolic handleKeystroke={this.handleKeystroke} />
          ||
          this.state.symbolic &&
            <KeyboardNumeric handleKeystroke={this.handleKeystroke} />
          ||
          this.state.shift &&
            <KeyboardUpperCase handleKeystroke={this.handleKeystroke} />
          ||
            <KeyboardLowerCase handleKeystroke={this.handleKeystroke} />
        }
      </div>
    )
  }
}

class BaseKeyboard extends Component {
  static propTypes = {
    handleKeystroke: React.PropTypes.func.isRequired,
  }

  handleKeystroke = (e) => {
    if (e.target.tagName === 'SPAN') {
      if (e.target.dataset && e.target.dataset.key) {
        return this.props.handleKeystroke(e.target.dataset.key)
      } else if (e.target.innerText) {
        return this.props.handleKeystroke(e.target.innerText)
      }
      console.warn('Key not found', e.target)
    }
  }
}

class KeyboardUpperCase extends BaseKeyboard {
  render () {
    return (
      <div onClick={this.handleKeystroke}
        className='keyboard'>
        <div className='row'>
          <span>Q</span>
          <span>W</span>
          <span>E</span>
          <span>R</span>
          <span>T</span>
          <span>Y</span>
          <span>U</span>
          <span>I</span>
          <span>O</span>
          <span>P</span>
        </div>
        <div className='row'>
          <span>A</span>
          <span>S</span>
          <span>D</span>
          <span>F</span>
          <span>G</span>
          <span>H</span>
          <span>J</span>
          <span>K</span>
          <span>L</span>
        </div>
        <div className='row'>
          <span data-key="shift" className='fa fa-arrow-circle-up shift'></span>
          <span>Z</span>
          <span>X</span>
          <span>C</span>
          <span>V</span>
          <span>B</span>
          <span>N</span>
          <span>M</span>
          <span data-key="backspace" className='fa fa-arrow-circle-left backspace'></span>
        </div>
        <div className='row'>
          <span data-key="symbolic" className='fa fa-th-list toggle-layout'></span>
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

class KeyboardLowerCase extends BaseKeyboard {
  render () {
    return (
      <div onClick={this.handleKeystroke}
        className='keyboard'>
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
          <span data-key="symbolic" className='fa fa-th-list toggle-layout'></span>
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

class KeyboardNumeric extends BaseKeyboard {
  render () {
    return (
      <div onClick={this.handleKeystroke}
        className='keyboard'>
        <div className='row'>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>0</span>
        </div>
        <div className='row'>
          <span>-</span>
          <span>/</span>
          <span>:</span>
          <span>;</span>
          <span>(</span>
          <span>)</span>
          <span>$</span>
          <span>&</span>
          <span>@</span>
          <span>&quot;</span>
        </div>
        <div className='row'>
          <span data-key="shift">#+=</span>
          <span>.</span>
          <span>,</span>
          <span>?</span>
          <span>!</span>
          <span>&apos;</span>
          <span data-key="backspace" className='fa fa-arrow-circle-left backspace'></span>
        </div>
        <div className='row'>
          <span data-key="symbolic" className='fa fa-th-list toggle-layout'></span>
          <span data-key="space">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span data-key="enter" className='fa fa-arrow-circle-down enter'></span>
        </div>
      </div>
    )
  }
}

class KeyboardSymbolic extends BaseKeyboard {
  render () {
    return (
      <div onClick={this.handleKeystroke}
        className='keyboard'>
        <div className='row'>
          <span>[</span>
          <span>]</span>
          <span>&#123;</span>
          <span>&#125;</span>
          <span>#</span>
          <span>%</span>
          <span>^</span>
          <span>*</span>
          <span>+</span>
          <span>=</span>
        </div>
        <div className='row'>
          <span>_</span>
          <span>\</span>
          <span>|</span>
          <span>~</span>
          <span>&lt;</span>
          <span>&gt;</span>
          <span>$</span>
          <span>&euro;</span>
          <span>&pound;</span>
          <span>&middot;</span>
        </div>
        <div className='row'>
          <span data-key="shift">#+=</span>
          <span>.</span>
          <span>,</span>
          <span>?</span>
          <span>!</span>
          <span>&apos;</span>
          <span data-key="backspace" className='fa fa-arrow-circle-left backspace'></span>
        </div>
        <div className='row'>
          <span data-key="symbolic" className='fa fa-th-list toggle-layout'></span>
          <span data-key="space">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
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
