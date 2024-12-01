import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { sendResetPasswordLink } from '../http/userAPI'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async () => {
		try {
			const response = await sendResetPasswordLink(email)
			setMessage(response.message)
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>Forgot Password</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Enter your e-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Button
						className='mt-3'
						variant='outline-success'
						onClick={handleSubmit}
					>
						Send Reset Link
					</Button>
					{message && <div className='mt-3 text-success'>{message}</div>}
				</Form>
			</Card>
		</Container>
	)
}

export default ForgotPassword
