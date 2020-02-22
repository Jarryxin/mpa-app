import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import styles from './test.less'
import { Config } from './routeConfig';
// import './test.css'
import './b.css'
import RouteGuard from '../utils/RouteGuard';

const App = () => (
  <Switch>
    {Config.map(route => (
      <Route path={route.path} exact={route.exact} render={props => {
        // setTimeout(function () {
        return <RouteGuard component={route.component} {...props} />
        // },0)
      }} />
    ))}
    <Route component={NotFund} />
  </Switch>
)
// RouteGuard

function Home(props) {
    console.log(props)
  return <div>index 首页</div>
}

function NotFund(props) {
    console.log(props)
    return <div>未找到</div>
}

export default withRouter(App)
