import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const PostItem = ({ post }) => {
	const navigate = useNavigate()

	const handlePostClick = () => {
		navigate(`/post/${post.id}`)
	}

	const handleAuthorClick = e => {
		e.stopPropagation()
		if (post.author) {
			navigate(`/user/${post.author.username}`)
		}
	}

	return (
		<Card
			className='mb-4'
			onClick={handlePostClick}
			style={{
				cursor: 'pointer',
				padding: '20px',
			}}
		>
			<div
				className='d-flex align-items-center'
				style={{ marginBottom: '20px' }}
			>
				{post.author ? (
					<>
						<img
							src={`http://localhost:3001/${post.author.avatar}`}
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
			{post.image ? (
				<Card.Img
					variant='top'
					src={`http://localhost:3001/${post.image}`} // Здесь используем путь к изображению
					alt={post.title}
					style={{ maxHeight: '300px', objectFit: 'cover' }}
				/>
			) : (
				<div
					style={{
						backgroundColor: '#f0f0f0',
						width: '100%',
						height: '300px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<span>No Image</span>
				</div>
			)}
			<Card.Body>
				<Card.Title>{post.title}</Card.Title>
				<Card.Text>{post.content}</Card.Text>
				<div className='d-flex justify-content-between'>
					<Button
						variant='primary'
						onClick={e => {
							e.stopPropagation()
							console.log('Like clicked for post:', post.id)
						}}
					>
						👍 {post.likes || 0}
					</Button>
					<Button
						variant='secondary'
						onClick={e => {
							e.stopPropagation()
							navigate(`/post/${post.id}#comments`)
						}}
					>
						💬 {post.comments || 0}
					</Button>
				</div>
			</Card.Body>
		</Card>
	)
}

export default PostItem
