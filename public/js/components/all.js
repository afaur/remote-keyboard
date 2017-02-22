import React, { Component } from 'react'

class BaseKeyboard extends Component {
  static propTypes = {
    handleTouchStart: React.PropTypes.func.isRequired,
    handleTouchEnd: React.PropTypes.func.isRequired,
  }

  handleTouchStart = (e) => {
    e.preventDefault()
    if (e.target.tagName === 'SPAN') {
      if (e.target.dataset && e.target.dataset.key) {
        return this.props.handleTouchStart(e.target.dataset.key)
      } else if (e.target.innerText) {
        return this.props.handleTouchStart(e.target.innerText)
      }
      console.warn('Key not found', e.target)
    }
  }

  handleTouchEnd = (e) => {
    e.preventDefault()
    if (e.target.tagName === 'SPAN') {
      if (e.target.dataset && e.target.dataset.key) {
        return this.props.handleTouchEnd(e.target.dataset.key)
      } else if (e.target.innerText) {
        return this.props.handleTouchEnd(e.target.innerText)
      }
      console.warn('Key not found', e.target)
    }
  }
}

class KeyboardUpperCase extends BaseKeyboard {
  render () {
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
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
          <span data-key="numeric" className='fa fa-th-list toggle-layout'></span>
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
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
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
          <span data-key="numeric" className='fa fa-th-list toggle-layout'></span>
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
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
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
          <span data-key="numeric" className='fa fa-th-list toggle-layout'></span>
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
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
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
          <span data-key="numeric" className='fa fa-th-list toggle-layout'></span>
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

export { KeyboardSymbolic, KeyboardNumeric, KeyboardUpperCase, KeyboardLowerCase }
