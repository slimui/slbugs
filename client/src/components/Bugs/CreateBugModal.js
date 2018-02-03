import React from 'react'
import { Modal, Button, Input, Select, Row, Col, notification } from 'antd'
import { graphql } from 'react-apollo'

import { createBugMutation, loadBugs } from '../../graphql'
const { Option } = Select
const { TextArea } = Input

class CreateBugModal extends React.Component {
	state = {
		visible: false,
		name: '',
		content: '',
		tags: [],
		type: ''
	}
	handleTypeChange = value => {
		this.setState({ type: value })
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
					projectId: this.props.projectId,
					name: this.state.name,
					type: this.state.type,
					content: this.state.content,
					tags: this.state.tags
				},
				refetchQueries: [
					{ query: loadBugs, variables: { id: this.props.projectId } }
				]
			})
			this.setState({
				visible: false,
				name: '',
				type: '',
				tags: [],
				content: ''
			})
		} catch (e) {
			console.log(e)
			notification['error']({
				duration: 5,
				message: 'Uh Oh!',
				description:
					'Please fill out all of the required fields if you want to submit a bug.'
			})
		}
	}
	handleCancel = () => {
		this.setState({ visible: false, name: '', type: '', tags: [], content: '' })
	}

	onTagsChange = value => this.setState({ tags: value })
	render() {
		return (
			<div>
				<Button onClick={this.showModal} style={{ marginBottom: 10 }}>
					New Bug
				</Button>
				<Modal
					title="Add New Bug"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input
						style={{ paddingBottom: '10px' }}
						addonBefore="Name"
						autofill="off"
						autoComplete="off"
						name="name"
						onChange={this.onInputChange}
						value={this.state.name}
					/>
					<div>
						<b>Content</b>
					</div>
					<TextArea
						rows={4}
						onChange={this.onInputChange}
						value={this.state.content}
						name="content"
					/>

					<Row style={{ padding: '5px' }}>
						<Col span={4}>Item Type</Col>
						<Col>
							<Select
								style={{ width: '50%' }}
								value={this.state.type}
								onChange={this.handleTypeChange}
							>
								<Option value="Feature">Feature</Option>
								<Option value="Bug">Bug</Option>
								<Option value="Data Request">Data Request</Option>
							</Select>
						</Col>
					</Row>
					<Row style={{ padding: '5px' }}>
						<Col span={4}>Tags</Col>
						<Col>
							<Select
								mode="tags"
								value={this.state.tags}
								size="default"
								placeholder="Select Tags"
								onChange={this.onTagsChange}
								style={{ width: '70%' }}
							>
								<Option key="1" value="Client Request">
									Client Request
								</Option>
								<Option key="2" value="UI">
									UI
								</Option>
								<Option key="3" value="Error">
									Error
								</Option>
							</Select>
						</Col>
					</Row>
				</Modal>
			</div>
		)
	}
}

export default graphql(createBugMutation)(CreateBugModal)
