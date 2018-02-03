import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, Row, Col, Table, Icon } from 'antd'
import { reshapeData } from '../../util'
import { NoProjects } from './ProjectStyles'

const columns = [
	{
		title: 'Projects',
		dataIndex: 'name',
		render: (name, { id }) => {
			return <Link to={`/${id}`}>{name}</Link>
		},
		width: '80%'
	},
	{
		title: '',
		key: 'settings',
		width: '10%',
		render: (text, { id }) => (
			<Link to={`/${id}/settings`}>
				<Tooltip placement="right" title="Settings">
					<Icon type="setting" style={{ fontSize: '20px', color: 'green' }} />
				</Tooltip>
			</Link>
		)
	}
]

const renderProjects = (projects, push, setHeader) => (
	<Table
		columns={columns}
		dataSource={reshapeData(projects)}
		scroll={{ y: '400px' }}
		rowKey="id"
		pagination={false}
	/>
)

export const Projects = ({ projects, selectProject, push, setHeader }) => {
	if (!Object.keys(projects).length) {
		return <NoProjects>You don't have any projects</NoProjects>
	}
	return (
		<Row justify="center" type="flex" style={{ marginTop: '50px' }}>
			<Col span={8}>{renderProjects(projects, push, setHeader)}</Col>
		</Row>
	)
}
