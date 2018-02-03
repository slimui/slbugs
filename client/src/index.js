import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './App'
import { ReactApolloProvider } from './apollo'
import Login from './components/User/Login'
import ConfirmUser from './components/User/ConfirmUser'
import Register from './components/User/Register'

ReactDOM.render(
	<BrowserRouter>
		<ReactApolloProvider>
			<Switch>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/confirm" exact component={ConfirmUser} />
				<Route path="/" component={App} />
			</Switch>
		</ReactApolloProvider>
	</BrowserRouter>,
	document.getElementById('root')
)
