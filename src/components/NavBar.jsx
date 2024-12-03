import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, POSTS_ROUTE, USER_ROUTE } from '../utils/constants'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const [isAdmin, setIsAdmin] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		setIsAdmin(user.hasRole('ADMIN'))
	}, [user.user])

	const handleAuthorization = () => {
		navigate(LOGIN_ROUTE)
	}

	const logOut = () => {
		user.setUser(null)
		user.setIsAuth(false)
		navigate(LOGIN_ROUTE)
	}

	// Обрезка имени пользователя, если длина больше 10 символов
	const truncateUsername = username =>
		username.length > 10 ? `${username.slice(0, 10)}...` : username

	// Переход на страницу пользователя
	const handleUserClick = () => {
		navigate(`${USER_ROUTE}/${user.user.id}`) // Переход на страницу профиля пользователя
	}

	return (
		<>
			<Navbar bg='dark' data-bs-theme='dark'>
				<Container>
					{/* Строка поиска */}
					<Form className='d-flex me-auto'>
						<FormControl
							type='search'
							placeholder='Search...'
							className='me-2'
							aria-label='Search'
						/>
					</Form>
					{/* Логотип */}
					<NavLink
						style={{ textDecoration: 'none', color: 'white' }}
						to={POSTS_ROUTE}
					>
						BarberForum
					</NavLink>
					{/* Информация о текущем пользователе */}
					{user.isAuth && (
						<div
							className='d-flex align-items-center ms-auto me-3'
							style={{ cursor: 'pointer' }}
							onClick={handleUserClick} // Обработка клика на блок
						>
							<img
								src={user.user.avatar || 'https://via.placeholder.com/40'}
								alt='User Avatar'
								style={{
									width: '40px',
									height: '40px',
									borderRadius: '50%',
									marginRight: '10px',
								}}
							/>
							<div>
								<div style={{ color: 'white', fontWeight: 'bold' }}>
									{truncateUsername(user.user.username)} {/* Обрезка имени */}
								</div>
								<div
									style={{
										color: isAdmin ? 'red' : 'white',
										fontSize: '0.9rem',
										fontWeight: isAdmin ? 'bold' : 'normal',
									}}
								>
									{isAdmin ? 'Admin' : 'User'}
								</div>
							</div>
						</div>
					)}
					{/* Кнопки авторизации / выхода */}
					{user.isAuth ? (
						<Nav className='ml-auto' style={{ color: 'white' }}>
							<Button variant={'outline-light'} onClick={() => logOut()}>
								Logout
							</Button>
							{isAdmin && (
								<Button
									variant={'outline-light'}
									style={{ marginLeft: '20px' }}
									onClick={() => navigate('/admin')}
								>
									Admin Panel
								</Button>
							)}
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
