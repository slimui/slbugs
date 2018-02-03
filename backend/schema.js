const schema = `
type Bug {
  id: ID!
  project: [Project!]
  content: String!
}

type Project {
  id: ID!
  name: String!
  bugs: [Bug!]
}

type UserProject {
  id: String!
  name: String!
  role: String!
}

type BugItem {
  name: String
  content: String
  itemId: String
  type: String
  projectId: String
  itemStatus: String
  tags: [String!]
}

type BugsResponse {
  ok: Boolean!
  items: [BugItem!]
}

type UserData {
  ok: Boolean
  errors: [String!]
  projects: String
  name: String
  email: String
  siteRole: String
}

type FindUserResponse {
  ok: Boolean!
  error: String
  user: User
}

type ProjectUser {
  name: String!
  userId: String!
  email: String!
  role: String!
}

type User {
  name: String!
  userId: String!
  email: String!
}
type Query  {
  projects(id: [ID!]!): [Project!]
  loadBugs(offset: Int, projectId: String!): BugsResponse!
  loadUserData: UserData!
  loadProjectSettings(projectId: String!): ProjectSettings!
}

type ProjectSettings {
  ok: Boolean!
  name: String
  dateCreated: String
  userList: String
}

type Response {
  ok: Boolean!
  error: String
}

type ProjectResponse {
  name: String!
  id: ID!
}

type Mutation {
  createProject(name: String!): ProjectResponse!
  addUserToProject(projectName:String!, projectId: String!, email: String!, userRole:String!): Response!
  createBug(projectId: String!, type: String!, name: String!, content: String!, tags: [String!]): Response!
}
`

export { schema }
