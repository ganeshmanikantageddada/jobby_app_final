import './App.css'

import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs/index'
import JobsCard from './components/JobsCard/index'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// Replace your code here

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute eaxt path="/jobs/:id" component={JobsCard} />
      <ProtectedRoute component={NotFound} />
    </Switch>
  </>
)

export default App
