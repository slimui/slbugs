import React from 'react'
import { graphql } from 'react-apollo'
import Layout from './styles/Layout'
import { loadUserData } from './graphql'
import { AppHeader } from './components/Header/AppHeader'
import { AppRoutes } from './routes'
import { authUser } from './auth'
import { Loading } from './components/Loading/Loading'

class App extends React.Component {
	state = {
		authenticating: true,
		authenticated: false
	}
	async componentDidMount() {
		try {
			if (await authUser()) {
				this.setState({ authenticated: true, authenticating: false })
			} else {
				this.props.history.push('/login')
			}
		} catch (e) {
			console.log(e)
		}
	}

	// extracts header from the list of projects of the user table
	checkHeader = (userProjects, pathname) => {
		const project = pathname.split('/')[1]
		if (project in userProjects) {
			return userProjects[project].name
		}
	}

	render() {
		if (this.state.authenticating) {
			return <Loading />
		}

		const {
			location: { pathname },
			data: { loading, error, loadUserData }
		} = this.props
		if (loading) {
			return null
		}
		if (!loadUserData.ok) {
			// the user was not in the dynamo table
			return <div>Something went wrong</div>
		}

		if (error) {
			console.log(error)
		}
		const { projects, email, name, siteRole } = loadUserData
		const userData = {
			siteRole,
			email,
			name
		}

		const projectList = JSON.parse(projects)
		return (
			<Layout>
				<AppHeader
					handleSignOut={this.handleSignOut}
					currentPath={pathname}
					userData={userData}
					header={this.checkHeader(projectList, pathname)}
					setHeader={this.setHeader}
				/>
				<AppRoutes projects={projectList} />
			</Layout>
		)
	}
}
const query = graphql(loadUserData, {
	options: {
		fetchPolicy: 'network-only'
	}
})

export default query(App)
