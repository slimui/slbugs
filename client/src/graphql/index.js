import gql from 'graphql-tag'

export const loadProjectSettings = gql`
	query($projectId: String!) {
		loadProjectSettings(projectId: $projectId) {
			name
			dateCreated
			userList
		}
	}
`

export const addUserToProject = gql`
	mutation(
		$projectName: String!
		$projectId: String!
		$userRole: String!
		$email: String!
	) {
		addUserToProject(
			projectName: $projectName
			projectId: $projectId
			userRole: $userRole
			email: $email
		) {
			ok
			error
		}
	}
`

export const loadUserData = gql`
	{
		loadUserData {
			ok
			errors
			name
			email
			siteRole
			projects
		}
	}
`
export const loadBugs = gql`
	query($id: String!) {
		loadBugs(projectId: $id) {
			ok
			items {
				itemId
				projectId
				type
				itemStatus
				name
				content
				tags
			}
		}
	}
`
export const createProjectMutation = gql`
	mutation($projectName: String!) {
		createProject(name: $projectName) {
			id
			name
		}
	}
`

export const createBugMutation = gql`
	mutation(
		$name: String!
		$projectId: String!
		$type: String!
		$content: String!
		$tags: [String!]
	) {
		createBug(
			type: $type
			name: $name
			projectId: $projectId
			content: $content
			tags: $tags
		) {
			ok
			error
		}
	}
`
