import React from 'react'
import { Tag, Table } from 'antd'
import { getBugIcon } from './util/getBugIcon'

const columns = [
	{
		title: '',
		dataIndex: 'type',
		render: (name, { type }) => getBugIcon(type),
		width: '5%'
	},
	{
		title: 'Status',
		dataIndex: 'itemStatus',
		width: '5%'
	},
	{
		title: 'Bug',
		dataIndex: 'name',
		width: '30%',
		render: (name, { tags }) => {
			return (
				<div>
					{name}
					<div>{renderTag(tags)}</div>
				</div>
			)
		}
	}
]

const renderTag = tags => {
	return tags.map(tag => (
		<Tag key={tag} color="blue">
			{tag}
		</Tag>
	))
}

export const Bug = ({ bugs }) => {
	return (
		<Table
			columns={columns}
			dataSource={bugs}
			scroll={{ y: '400px' }}
			rowKey="itemId"
			pagination={false}
			size="small"
		/>
	)
}
