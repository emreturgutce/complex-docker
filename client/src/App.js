import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { OtherPage } from './other-page'
import { Fib } from './fib'

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
          <img src={logo} alt='logo' className='App-logo' />
          <h1>Welcome to react</h1>
          <Link to='/'>Home</Link>
          <Link to='/otherpage'>Other Page</Link>
        </header>
        <div>
          <Route exact path='/' component={Fib} />
          <Route path='/otherpage' component={OtherPage} />
        </div>
      </div>
    </Router>
  )
}

export default App
