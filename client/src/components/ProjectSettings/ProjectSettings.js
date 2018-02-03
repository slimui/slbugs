import React from 'react'
import { graphql } from 'react-apollo'
import { loadProjectSettings } from '../../graphql'
import { Button, Row, Col, Switch } from 'antd'
import { Link } from 'react-router-dom'
import { UserList } from './UserList'
import { UserTitle, UserHeader, UserAddIcon } from './ProjectSettingStyles'
import AddUserModal from './AddUserModal'
const ProjectSettings = ({
	match,
	data: { loading, error, loadProjectSettings }
}) => {
	if (loading) {
		return null
	}

	const { dateCreated, userList } = loadProjectSettings
	const newUserList = JSON.parse(userList)
	return (
		<div>
			<Link to={`/${match.params.id}`}>
				<Button>Back to Bugs</Button>
			</Link>

			<Row type="flex" justify="center" align="top">
				<Col span={8} style={{ backgroundColor: 'white', padding: '20px' }}>
					<Row>
						<div>Date Created: {dateCreated}</div>
					</Row>
					<Row>
						Active: <Switch defaultChecked />
					</Row>
					<hr />
					<UserHeader>
						<UserTitle>
							<h1>Users</h1>
						</UserTitle>
						<UserAddIcon>
							<AddUserModal
								projectName={loadProjectSettings.name}
								projectId={match.params.id}
							/>
						</UserAddIcon>
					</UserHeader>
					<UserList usersList={newUserList} />
				</Col>
			</Row>
		</div>
	)
}

export default graphql(loadProjectSettings, {
	options: props => ({
		variables: {
			projectId: props.match.params.id
		}
	})
})(ProjectSettings)
