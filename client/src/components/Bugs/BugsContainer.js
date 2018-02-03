import React from 'react'
import { loadBugs } from '../../graphql'
import { graphql } from 'react-apollo'
import CreateBugModal from './CreateBugModal'
import { Bug } from './Bug'
import { pure, branch, renderComponent, compose } from 'recompose'
import { BugListContainer, NoBugs } from './BugStyles'
import { Loading } from '../Loading/Loading'

const loadingState = branch(
	props => props.data.loading,
	renderComponent(Loading)
)

const Bugs = ({
	userProjects,
	setHeader,
	match,
	selectedProject,
	data: { loadBugs }
}) => {
	if (loadBugs.items.length === 0) {
		return (
			<NoBugs>
				<div>
					There are no bugs for this project
					<CreateBugModal projectId={match.params.id} />
				</div>
			</NoBugs>
		)
	}
	return (
		<BugListContainer>
			<CreateBugModal projectId={match.params.id} />
			<Bug bugs={loadBugs.items} />
		</BugListContainer>
	)
}
const query = graphql(loadBugs, {
	options: props => ({
		variables: {
			id: props.match.params.id
		}
	})
})
const BugComponent = compose(query, loadingState, pure)(Bugs)
export default BugComponent
