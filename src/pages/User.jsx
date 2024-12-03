import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllPosts, getPostsByUserId } from '../http/postAPI'
import PostList from '../components/PostList'
import { Context } from '..'
import { Spinner, Container, Row, Col, Card, Image } from 'react-bootstrap'
import { getUserById } from '../http/userAPI'

const User = () => {
	const { id } = useParams() // Retrieve the user ID from the URL
  const {posts} = useContext(Context)
  const [user, setUser] = useState(null)
	// const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUserAndPosts = async () => {
			try {
        setLoading(true)
        const userData = await getUserById(id);
        setUser(userData)
        console.log(user)
				const postsData = await getPostsByUserId(id) 
				posts.setPosts(postsData.data)
        // console.log(postsData.data)
				// setPosts(userPosts)
			} catch (error) {
				console.error('Error fetching user or posts:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUserAndPosts()
	}, [id])

  function getPrimaryRole(roles) {
		const adminRole = roles.find(role => role.value === 'ADMIN')
		return adminRole ? adminRole.value : 'USER'
	}


	if (loading) {
		return (
			<Container className='text-center mt-5'>
				<Spinner animation='border' variant='primary' />
				<p>Loading...</p>
			</Container>
		)
	}

	if (!user) {
		return (
			<Container className='text-center mt-5'>
				<p>User not found</p>
			</Container>
		)
	}

	return (
		<Container className='user-page mt-4'>
			<Row>
				<Col md={4} className='text-center'>
					<Card>
						<Card.Body>
							<Image
								src={user.avatar || 'https://via.placeholder.com/100'}
								alt='User Avatar'
								roundedCircle
								className='mb-3'
								style={{ width: '100px', height: '100px' }}
							/>
							<Card.Title>{user.username}</Card.Title>
							<Card.Text>Email: {user.email}</Card.Text>
							<Card.Text>
								Role: {getPrimaryRole(user.roles)}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={8}>
					<h3 className='mb-3'>{user.username}'s Posts</h3>
					<PostList posts={posts} />
				</Col>
			</Row>
		</Container>
	)
}

export default User
