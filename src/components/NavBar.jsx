import React, { useContext } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, POSTS_ROUTE } from '../utils/constants'
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate();

	const handleAuthorization = () => {
		user.setIsAuth(true);
		navigate(LOGIN_ROUTE)
	}

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
	}

	return (
		<>
			<Navbar bg='dark' data-bs-theme='dark'>
				<Container>
					<NavLink style={{ color: 'white' }} to={POSTS_ROUTE}>
						BarberForum
					</NavLink>
					{user.isAuth ? (
						<Nav className='ml-auto' style={{ color: 'white' }}>
							<Button 
								variant={'outline-light'}
								onClick={() => logOut()}
							>
								Logout
							</Button>
							<Button variant={'outline-light'} style={{ marginLeft: '20px' }}>
								Admin Panel
							</Button>
						</Nav>
					) : (
						<Nav className='ml-auto' style={{ color: 'white' }}>
							<Button
								variant={'outline-light'}
								onClick={() => handleAuthorization()}
							>
								Authorization
							</Button>
						</Nav>
					)}
				</Container>
			</Navbar>
		</>
	)
})

export default NavBar
