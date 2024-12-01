import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { useContext, useState, useEffect } from 'react'
import { Context } from '.'
import { check } from './http/userAPI'
import Spinner from 'react-bootstrap/Spinner'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const verifyUser = async () => {
			try {
				const token = localStorage.getItem('token')
				if (token) {
					const data = await check()
					user.setUser(data) 
					user.setIsAuth(true)
				} else {
					console.warn('No token found')
				}
			} catch (error) {
				console.error(
					'Authorization failed:',
					error.response?.data || error.message
				)
				user.setIsAuth(false)
				localStorage.removeItem('token')
			} finally {
				setLoading(false)
			}
		}

		verifyUser()
	}, [user])

	if (loading) {
		return (
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<Spinner animation='grow' />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})

export default App
