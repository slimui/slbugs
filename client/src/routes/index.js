import { Route } from 'react-router-dom'
import React from 'react'
import ProjectSettings from '../components/ProjectSettings/ProjectSettings'
import { Projects } from '../components/Projects/Projects'
import Bugs from '../components/Bugs/BugsContainer'
export const AppRoutes = ({ projects }) => [
	<Route
		key="/"
		path="/"
		exact
		render={() => <Projects projects={projects} />}
	/>,
	<Route
		key="/:id"
		path="/:id"
		exact
		render={props => <Bugs userProjects={projects} {...props} />}
	/>,
	<Route key="/:id/settings" path="/:id/settings" component={ProjectSettings} />
]
