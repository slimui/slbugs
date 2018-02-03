import React from 'react'
import { Tooltip, Icon } from 'antd'

export const getBugIcon = type => {
	switch (type) {
		case 'Bug':
			return (
				<Tooltip placement="left" title={type}>
					<Icon type="frown" style={{ fontSize: 24, color: '#08c' }} />
				</Tooltip>
			)
		case 'Feature':
			return (
				<Tooltip placement="left" title={type}>
					<Icon
						type="question-circle"
						style={{ fontSize: 24, color: 'palevioletred' }}
					/>
				</Tooltip>
			)
		case 'Data Request':
			return (
				<Tooltip placement="left" title={type}>
					<Icon type="database" style={{ fontSize: 24, color: '#8AC054' }} />
				</Tooltip>
			)
		default:
			return null
	}
}
