import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import './a.css'

const App = () => (
  <Switch>
    <Route path='/index2' exact component={Login} />
    <Route path='/index2/view/b' component={Home} />
  </Switch>
)

function Login(props) {
    console.log("登录 首页", props)
  return <div>a 登录</div>
}

function Home(props) {
  return <div>a 首页 ???cc</div>
}

export default withRouter(App)
