import { loadUserData } from './queries/loadUserData'
import { loadBugs } from './queries/loadBugs'
import { createProject } from './mutations/createProject'
import { addUserToProject } from './mutations/addUserToProject'
import { createBug } from './mutations/createBug'
import { loadProjectSettings } from './queries/loadProjectSettings'

export const resolvers = {
	Query: {
		loadBugs: (root, args, context) => loadBugs(args, context),
		loadUserData: (root, args, context) => loadUserData(args, context),
		loadProjectSettings: (root, args, context) =>
			loadProjectSettings(args, context)
	},
	Mutation: {
		createProject: (root, args, context) => createProject(args, context),
		createBug: (root, args, context) => createBug(args, context),
		addUserToProject: (root, args, context) => addUserToProject(args, context)
	}
}
