import './App.css'

import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs/index'
import JobsCard from './components/JobsCard/index'

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/jobs" component={Jobs} />
      <Route eaxt path="/jobs/:id" component={JobsCard} />
    </Switch>
  </>
)

export default App
