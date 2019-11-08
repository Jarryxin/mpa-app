import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route path='/index1' exact component={Home} />
    <Route path='/index1/index/login' component={Login} />
    <Route component={NotFund} />
  </Switch>
)

function Login(props) {
    console.log(props)
  return <div>index 登录</div>
}

function Home(props) {
    console.log(props)
  return <div>index 首页</div>
}

function NotFund(props) {
    console.log(props)
    return <div>未找到</div>
}

export default withRouter(App)
