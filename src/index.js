import 'sanitize.css'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import Immutable from 'immutable'
import configureStore, {history} from './configureStore'
import App from './routes/index'

const initialState = Immutable.Map()
const store = configureStore(initialState)
// window.store = store
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}
