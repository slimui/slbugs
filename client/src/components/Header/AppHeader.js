import React from 'react'
import {
	Header,
	UserName,
	User,
	ProjectName,
	HeaderItems
} from './AppHeaderStyles'
import { Icon, Tooltip, Button } from 'antd'
import { Link } from 'react-router-dom'
import AddProjectModal from './AddProjectModal'
import { signOutUser } from '../../auth'

const renderHeaderItems = (role, currentPath) => {
	if (currentPath === '/') {
		if (role === 'Admin') {
			return <AddProjectModal />
		}
	} else {
		return (
			<Link to="/">
				<Icon type="left" />Projects
			</Link>
		)
	}
}

export const AppHeader = ({ userData, currentPath, header }) => (
	<Header>
		<HeaderItems>
			{renderHeaderItems(userData.siteRole, currentPath)}
		</HeaderItems>
		<ProjectName>{header}</ProjectName>
		<User>
			<UserName>
				<b>{userData.name}</b> <em>({userData.email})</em>
			</UserName>
			<Tooltip placement="leftBottom" title="Logout">
				<Button
					className="logout-button"
					shape="circle"
					icon="logout"
					onClick={() => signOutUser()}
				/>
			</Tooltip>
		</User>
	</Header>
)
