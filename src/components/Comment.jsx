import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import {
	likeComment,
	unlikeComment,
	getAllLikesForComment,
} from '../http/commentsAPI'

const Comment = ({ comment }) => {
	const [likes, setLikes] = useState(0)
	const [liked, setLiked] = useState(false)

	useEffect(() => {
		// Подгружаем количество лайков и состояние лайка для текущего пользователя
		const fetchLikesData = async () => {
			try {
				const likesData = await getAllLikesForComment(comment.id)
				setLikes(likesData.length)
				// setLiked(likesData.userLiked)
			} catch (error) {
				console.error('Error fetching likes data:', error)
			}
		}

		fetchLikesData()
	}, [comment.id])

	const handleLike = async () => {
		try {
			if (liked) {
				await unlikeComment(comment.id)
				setLikes(prev => prev - 1)
			} else {
				await likeComment(comment.id)
				setLikes(prev => prev + 1)
			}
			setLiked(!liked)
		} catch (error) {
			console.error('Error liking comment:', error)
		}
	}

	return (
		<Card className='mb-3'>
			<Card.Body>
				<Card.Text>
					<strong>{comment.author.username}</strong>: {comment.content}
				</Card.Text>
				<Button
					variant={liked ? 'danger' : 'primary'}
					size='sm'
					onClick={handleLike}
				>
					{liked ? 'Unlike' : 'Like'} ({likes})
				</Button>
			</Card.Body>
		</Card>
	)
}

export default Comment
