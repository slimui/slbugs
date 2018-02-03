/* eslint-disable */
import React from 'react'
import { Icon, Card } from 'antd'

export const validateEmail = email => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

const containsSpecialCharacter = str => {
	return /[~`!#$%\^@&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str)
}

const getIcon = value =>
	value ? (
		<Icon type="check-circle" style={{ color: 'green', fontSize: '18px' }} />
	) : (
		<Icon type="right-circle" />
	)
const hasNumber = myString => /\d/.test(myString)

export const AccountValidation = ({ user }) => {
	return (
		<Card className="account-validation">
			<b>Email</b>
			<div> {getIcon(validateEmail(user.email))} Must be valid.</div>
			<br />
			<b>Password</b>
			<div>
				{getIcon(user.password.length >= 8)} Is at least 8 characters in length.
			</div>
			<div> {getIcon(hasNumber(user.password))} Contans atleast 1 number.</div>
			<div>
				{getIcon(containsSpecialCharacter(user.password))} Has at least 1 unique
				character.
			</div>
			<div>
				{getIcon(
					user.password.length > 0 && user.password === user.confirmPassword
				)}{' '}
				Passwords must match.
			</div>
		</Card>
	)
}
