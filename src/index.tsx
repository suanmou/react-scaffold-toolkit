import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from '@components'

const App = () => (
  <div className="App" style={{ display: 'none' }}>
    Hello World1
    <Header />
  </div>
)

ReactDOM.render(<App />, document.querySelector('#root'))
