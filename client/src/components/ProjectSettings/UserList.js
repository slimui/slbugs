import React from 'react'
import { List, Avatar } from 'antd'
import { reshapeData } from '../../util'

export const UserList = ({ usersList }) => {
	return (
		<List
			dataSource={reshapeData(usersList)}
			renderItem={item => (
				<List.Item key={item.id}>
					<List.Item.Meta
						avatar={<Avatar>{item.name.slice(0, 1)}</Avatar>}
						title={<a>{item.name}</a>}
						description={item.email}
					/>
					<div>{item.role}</div>
				</List.Item>
			)}
		/>
	)
}
