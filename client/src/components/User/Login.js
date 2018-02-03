import React from 'react'
import { login } from '../../auth'
import { Form, Icon, Input, Button, Row, Col, message } from 'antd'
import './LoginStyles.css'
const FormItem = Form.Item
class Login extends React.Component {
	state = {
		password: '',
		email: '',
		loginSuccess: false,
		error: '',
		isSubmitting: false,
		fromConfirm: false,
		name: ''
	}
	componentDidMount = () => {
		const { location: { state } } = this.props
		if (state && state.email) {
			this.setState({ email: state.email, fromConfirm: true, name: state.name })
			this.setState({})
		}
	}

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value })
		this.setState({ error: '' })
	}
	handleSubmit = async event => {
		event.preventDefault()
		this.setState({ isSubmitting: true })

		try {
			/* catch statement catches failed submissions to cognito */
			await login(this.state.email, this.state.password)
			this.setState({ loginSuccess: true, isSubmitting: false })
			this.props.history.push('/')
		} catch (e) {
			this.setState({ loginSuccess: false, isSubmitting: false })
			this.setState({ error: 'error' })
			message.error('Incorrect login.', 3)
		}
	}

	render() {
		if (this.state.fromConfirm) {
		}
		return (
			<div>
				<Row justify="center" type="flex">
					{this.state.fromConfirm && (
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
							Welcome, <b>{this.state.name}!</b> Please login below to get
							started with your new account.
						</div>
					)}
				</Row>
				<Row
					type="flex"
					justify="center"
					style={{ height: '100vh', marginTop: '5%' }}
					align="top"
				>
					<Col span={6}>
						<div className="login-header">slbugs</div>
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
									value={this.state.password}
									onChange={this.handleInputChange}
									name="password"
									prefix={
										<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									type="password"
									placeholder="Password"
								/>
							</FormItem>
							<FormItem>
								<Button
									className="login-button"
									loading={this.state.isSubmitting}
									size="large"
									htmlType="submit"
								>
									Log in
								</Button>
							</FormItem>
						</Form>
						<div className="login-footer">
							<a style={{ float: 'left' }}>Don't have an account?</a>
							<a style={{ float: 'right' }}>Forgot password?</a>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}
const LoginForm = Form.create()(Login)

export default LoginForm
