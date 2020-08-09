import React, {Component} from 'react'
import {render} from 'react-dom'
import Chat from '../../src/components/Chat/Chat'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>sglg-communications Demo</h1>
      <Chat
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
