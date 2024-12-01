import { $host, $authHost } from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password, username) => {
	const { data } = await $host.post('auth/registration', {
		email,
		password,
		username,
	})
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const login = async (email, password) => {
	const { data } = await $host.post('auth/login', { email, password })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const check = async () => {
	const { data } = await $authHost.post('auth/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const sendResetPasswordLink = async email => {
	const { data } = await $host.post('/auth/forgot-password', { email })
	return data
}

export const resetPassword = async (token, newPassword) => {
	// console.log(`token: ${token}\npassword: ${newPassword}`);
	const { data } = await $host.post('/auth/reset-password', {
		token,
		newPassword,
	})
	return data
}
