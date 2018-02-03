import React from 'react'
import { confirmUser } from '../../auth'
import { Redirect, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Row, Col, message } from 'antd'
import './LoginStyles.css'
const FormItem = Form.Item
class ConfirmUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			code: '',
			isFromRegister: false,
			error: '',
			confirmSuccess: false,
			name: ''
		}
	}
	componentDidMount = () => {
		const { location: { state } } = this.props
		if (state && state.email) {
			this.setState({
				email: state.email,
				name: state.name,
				isFromRegister: true
			})
		}
	}

	handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = async e => {
		e.preventDefault()
		const user = {
			email: this.state.email,
			code: this.state.code
		}
		try {
			const confirmResults = await confirmUser(user)
			if (confirmResults === 'SUCCESS') {
				this.setState({ confirmSuccess: true })
			}
		} catch (err) {
			message.error('Invalid code or email address.', 3)
			console.log(err.message)
		}
	}

	render() {
		if (this.state.confirmSuccess) {
			return (
				<Redirect
					to={{
						pathname: '/login',
						state: {
							fromConfirm: true,
							email: this.state.email,
							name: this.state.name
						}
					}}
				/>
			)
		}
		return (
			<div>
				RESEND EMAIL
				<Row justify="center" type="flex">
					<div
						style={{
							padding: '10px',
							marginTop: '50px',
							color: 'black',
							backgroundColor: '#82ca9c',
							width: '60%',
							textAlign: 'center',
							borderRadius: '20px'
						}}
					>
						Check your email for a <b>confirmation code</b>. If you have not
						received a confirmation code, click Resend Code below. Otherwise,
						head to
						<Link to="/register"> our registration page </Link>to create an
						account.
					</div>
				</Row>
				<Row
					type="flex"
					justify="center"
					style={{ height: '100vh', marginTop: '5%' }}
					align="top"
				>
					<Col span={6}>
						<div className="login-header">Confirm Account</div>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<FormItem validateStatus={this.state.error}>
								<Input
									className="login-input"
									name="email"
									autoComplete="off"
									value={this.state.email}
									onChange={this.handleInputChange}
									prefix={
										<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									placeholder="Email Address"
								/>
							</FormItem>
							<FormItem validateStatus={this.state.error}>
								<Input
									className="login-input"
									value={this.state.code}
									onChange={this.handleInputChange}
									name="code"
									prefix={
										<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									type="text"
									placeholder="Code"
								/>
							</FormItem>
							<FormItem>
								<Button
									className="login-button"
									loading={this.state.isSubmitting}
									size="large"
									htmlType="submit"
								>
									Confirm
								</Button>
							</FormItem>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
}

export default ConfirmUser
