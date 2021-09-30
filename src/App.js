import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/index'
import Home from './components/Home/index'
import JobDetails from './components/Job Details'
import JobsRoute from './components/JobsRoute/index'
import Login from './components/Login'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
