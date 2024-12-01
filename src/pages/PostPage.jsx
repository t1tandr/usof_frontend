import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const PostPage = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)

	useEffect(() => {
		// Здесь нужно добавить ваш запрос для получения данных поста по id
		const fetchPost = async () => {
			const response = await fetch(`/api/posts/${id}`)
			const data = await response.json()
			setPost(data)
		}

		fetchPost()
	}, [id])

	if (!post) return <div>Loading...</div>

	return (
		<div>
			<Card>
				<Card.Img
					variant='top'
					src={`http://localhost:3001/${post.image}`}
					alt={post.title}
				/>
				<Card.Body>
					<Card.Title>{post.title}</Card.Title>
					<Card.Text>{post.content}</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default PostPage
