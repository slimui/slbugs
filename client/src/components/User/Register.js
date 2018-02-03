import React from 'react'
import { signUp } from '../../auth'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Row, Col, message } from 'antd'
import { AccountValidation } from './Validation'
import './LoginStyles.css'

const FormItem = Form.Item
class Register extends React.PureComponent {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		isSubmitting: false,
		submitSuccess: false
	}

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value })
		this.setState({ error: '' })
	}

	handleSubmit = async e => {
		this.setState({ isSubmitting: true })
		e.preventDefault()
		const user = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name
		}

		try {
			await signUp(user)
			this.setState({ isSubmitting: false })
			this.setState({ submitSuccess: true })
		} catch (err) {
			message.error(err.message, 3)
			this.setState({ isSubmitting: false })
			console.log(err.message)
		}
	}

	render() {
		if (this.state.submitSuccess) {
			return (
				<Redirect
					to={{
						pathname: `/confirm`,
						state: { email: this.state.email, name: this.state.name }
					}}
				/>
			)
		}

		return (
			<Row
				className="register-row"
				type="flex"
				justify="center"
				style={{ height: '100vh', alignItems: 'center' }}
			>
				<Col span={6}>
					<AccountValidation user={this.state} />
				</Col>
				<Col span={6}>
					<div className="login-header">Registration</div>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<FormItem validateStatus={this.state.error}>
							<Input
								className="login-input"
								value={this.state.name}
								onChange={this.handleInputChange}
								name="name"
								prefix={
									<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								type="text"
								placeholder="Name"
							/>
						</FormItem>
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
						<FormItem validateStatus={this.state.error}>
							<Input
								className="login-input"
								value={this.state.confirmPassword}
								onChange={this.handleInputChange}
								name="confirmPassword"
								prefix={
									<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								type="password"
								placeholder="Confirm Password"
							/>
						</FormItem>
						<FormItem>
							<Button
								disabled={this.state.password !== this.state.confirmPassword}
								className="register-button"
								loading={this.state.isSubmitting}
								size="large"
								htmlType="submit"
							>
								Register Account
							</Button>
						</FormItem>
					</Form>
				</Col>
			</Row>
		)
	}
}

export default Register
