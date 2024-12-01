import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { resetPassword } from '../http/userAPI'

const ResetPassword = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const queryParams = new URLSearchParams(location.search)
	const token = queryParams.get('token')

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleReset = async () => {
		if (password !== confirmPassword) {
			alert("Passwords don't match!")
			return
		}

		try {
			await resetPassword(token, password)
			alert('Password reset successfully!')
			navigate('/login')
		} catch (error) {
			alert(error.response?.data?.message || 'An error occurred')
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>Reset Password</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						type='password'
						placeholder='New Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<Button
						className='mt-3'
						variant='outline-success'
						onClick={handleReset}
					>
						Reset Password
					</Button>
				</Form>
			</Card>
		</Container>
	)
}

export default ResetPassword
