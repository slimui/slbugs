import React from 'react'
import { Modal, Button, Input, Select, Tooltip, notification } from 'antd'
import { graphql } from 'react-apollo'
import { loadProjectSettings, addUserToProject } from '../../graphql'
const Option = Select.Option

class AddUserModal extends React.Component {
	state = {
		visible: false,
		email: '',
		role: ''
	}
	onInputChange = e => this.setState({ [e.target.name]: e.target.value })
	showModal = () => {
		this.setState({
			visible: true
		})
	}

	handleOk = async () => {
		try {
			const result = await this.props.mutate({
				variables: {
					email: this.state.email,
					userRole: this.state.role,
					projectName: this.props.projectName,
					projectId: this.props.projectId
				},
				refetchQueries: [
					{
						query: loadProjectSettings,
						variables: { projectId: this.props.projectId }
					}
				]
			})
			if (!result.data.addUserToProject.ok) {
				return notification['error']({
					duration: 5,
					message: 'Uh Oh!',
					description: 'That user does not exist.'
				})
			}
			this.setState({ visible: false, email: '', role: '' })
		} catch (e) {
			notification['error']({
				duration: 5,
				message: 'Uh Oh!',
				description:
					'Please fill out all of the required fields to add a new user to the project.'
			})
		}
	}
	handleCancel = () => {
		this.setState({ visible: false, email: '', role: '' })
	}
	handleRoleChange = role => this.setState({ role })

	render() {
		const { visible } = this.state
		return (
			<div>
				<Tooltip placement="left" title="Add User">
					<Button icon="user-add" size="large" onClick={this.showModal} />
				</Tooltip>
				<Modal
					title="Add New Project"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<div style={{ marginBottom: 16 }}>
						<Input
							addonBefore="Email"
							name="email"
							onChange={this.onInputChange}
							value={this.state.email}
						/>
						<div>Role</div>
						<Select style={{ width: 120 }} onChange={this.handleRoleChange}>
							<Option value="Standard">Standard</Option>
							<Option value="Admin">Admin</Option>
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
}

export default graphql(addUserToProject)(AddUserModal)
