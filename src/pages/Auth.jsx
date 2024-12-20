import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/Row'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE } from '../utils/constants'
import { login, registration } from '../http/userAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Auth = observer(() => {
	const {user} = useContext(Context);
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const click = async () => {
		try {
			let data;
			if(isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password, username);
			}
			user.setUser(data);
			user.setIsAuth(true);
			// console.log(user)
			navigate(POSTS_ROUTE);
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
				<h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-3'
						placeholder='Input your e-mail'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-2'
						placeholder='Input your password'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					{isLogin && (
						<div className='w-auto'>
							<NavLink to={FORGOT_PASSWORD_ROUTE}>Forgot password?</NavLink>
						</div>
					)}
					{!isLogin && (
						<Form.Control
							className='mt-2'
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder='Create your username'
						/>
					)}
					<Row className='d-flex justify-content-between align-items-center mt-3'>
						{isLogin ? (
							<div className='w-auto'>
								No account?{' '}
								<NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
							</div>
						) : (
							<div className='w-auto'>
								Have account? <NavLink to={LOGIN_ROUTE}>Log In</NavLink>
							</div>
						)}
						<Button
							className='w-auto'
							variant='outline-success'
							onClick={click}
						>
							{isLogin ? 'Login' : 'Registration'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
