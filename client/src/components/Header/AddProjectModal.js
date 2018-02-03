import React from 'react'
import { Modal, Input, Button } from 'antd'
import { graphql } from 'react-apollo'
import { loadUserData, createProjectMutation } from '../../graphql'

class AddProjectModal extends React.Component {
	state = {
		visible: false,
		confirmLoading: false,
		projectName: ''
	}
	onInputChange = e => this.setState({ [e.target.name]: e.target.value })
	showModal = () => {
		this.setState({
			visible: true
		})
	}

	handleOk = async () => {
		try {
			await this.props.mutate({
				variables: {
					projectName: this.state.projectName
				},
				refetchQueries: [{ query: loadUserData }]
			})
			this.setState({ visible: false, projectName: '' })
		} catch (e) {
			console.log(e)
		}
	}
	handleCancel = () => {
		this.setState({
			projectName: '',
			visible: false
		})
	}
	render() {
		const { visible } = this.state
		return (
			<div>
				<Button
					className="add-project-button"
					type="primary"
					icon="plus"
					onClick={this.showModal}
				>
					Project
				</Button>
				<Modal
					title="Add New Project"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<div style={{ marginBottom: 16 }}>
						<Input
							addonBefore="Project Name"
							name="projectName"
							onChange={this.onInputChange}
							value={this.state.projectName}
						/>
					</div>
				</Modal>
			</div>
		)
	}
}

export default graphql(createProjectMutation)(AddProjectModal)
