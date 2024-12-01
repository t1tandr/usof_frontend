import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const PostItem = ({ post }) => {
	const navigate = useNavigate()

	const handlePostClick = () => {
		// Навигация на страницу конкретного поста
		navigate(`/post/${post.id}`)
	}

	const handleAuthorClick = e => {
		// Навигация на страницу автора поста
		e.stopPropagation() // предотвращает переход на страницу поста
		if (post.author) {
			navigate(`/user/${post.author.username}`)
		}
	}

	return (
		<Card
			className='mb-4'
			onClick={handlePostClick}
			style={{ cursor: 'pointer' }}
		>
			<Card.Img
				variant='top'
				src={`http://localhost:5000/images/${post.image}`} // Здесь используем путь к изображению
				alt={post.title}
				style={{ maxHeight: '300px', objectFit: 'cover' }}
			/>
			<Card.Body>
				<Card.Title>{post.title}</Card.Title>
				<Card.Text>{post.content}</Card.Text>
				<div className='d-flex align-items-center'>
					{post.author ? (
						<>
							<img
								src={`http://localhost:5000/images/${post.author.avatar}`}
								alt={post.author.username}
								style={{
									width: '40px',
									height: '40px',
									borderRadius: '50%',
									marginRight: '10px',
									cursor: 'pointer',
								}}
								onClick={handleAuthorClick} // Навигация на страницу автора
							/>
							<Button variant='link' onClick={handleAuthorClick}>
								{post.author.username}
							</Button>
						</>
					) : (
						<span>Unknown Author</span>
					)}
				</div>
			</Card.Body>
		</Card>
	)
}

export default PostItem
