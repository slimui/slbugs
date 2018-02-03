import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authUser } from '../auth'
export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				authUser() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login'
						}}
					/>
				)
			}
		/>
	)
}
