import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Form, Card } from 'react-bootstrap'
import { createComment, getAllCommentsForPost } from '../http/commentsAPI'
import {
	getPostById,
	likePost,
	unlikePost,
	countPostLikes,
	updatePost,
} from '../http/postAPI'
import Comment from '../components/Comment'
import { Context } from '..'
import UpdatePostForm from '../components/UpdatePostForm'

const Post = () => {
	const { id } = useParams()
	const { user, posts } = useContext(Context)
	const [post, setPost] = useState(null)
	const [comments, setComments] = useState([])
	const [likes, setLikes] = useState(0)
	const [liked, setLiked] = useState(false)
	const [newComment, setNewComment] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [updatedTitle, setUpdatedTitle] = useState('')
	const [updatedContent, setUpdatedContent] = useState('')
	const [updatedCategoryId, setUpdatedCategoryId] = useState('')

	const canEdit = user.user.id === post?.userId || user.hasRole('ADMIN')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const postData = await getPostById(id)
				setPost(postData)
				const commentsData = await getAllCommentsForPost(id)
				setComments(commentsData)
				const likesData = await countPostLikes(id)
				setLikes(likesData)
			} catch (error) {
				console.error('Error fetching post data:', error)
			}
		}
		fetchData()
	}, [id])

	const handleLike = async () => {
		try {
			if (liked) {
				await unlikePost(id)
				setLikes(likes - 1)
			} else {
				await likePost(id)
				setLikes(likes + 1)
			}
			setLiked(!liked)
		} catch (error) {
			console.error('Error liking post:', error)
		}
	}

	const handleAddComment = async () => {
		try {
			const newCommentData = { content: newComment }
			const addedComment = await createComment(id, newCommentData) // Реализовать API для создания комментария
			setComments([...comments, addedComment])
			setNewComment('')
		} catch (error) {
			console.error('Error adding comment:', error)
		}
	}

	const handleUpdatePost = async updatedPost => {
		console.log('Updated Post Data:', updatedPost)
		console.log('Id for updateL ', id)
		await updatePost(id, updatedPost);
	}

	if (!post) return <p>Loading...</p>

	return (
		<Container>
			<Row className='my-4'>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>{post.title}</Card.Title>
							<Image
								src={`http://localhost:3001/${post.image}`}
								alt={post.title}
								fluid
								className='mb-3'
							/>
							<Card.Text>{post.content}</Card.Text>
							<Button
								variant={liked ? 'danger' : 'primary'}
								onClick={handleLike}
								className='me-2'
							>
								{liked ? 'Unlike' : 'Like'} ({likes || 'no likes'})
							</Button>
							{canEdit && (
								<Button
									variant='warning'
									className='mt-3'
									onClick={() => {
										setIsEditing(true)
										setUpdatedTitle(post.title)
										setUpdatedContent(post.content)
										setUpdatedCategoryId(post.categoryId)
									}}
								>
									Edit Data
								</Button>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{isEditing && <UpdatePostForm post={post} categories={posts.categories} onUpdate={handleUpdatePost} />}

			<Row className='my-4'>
				<Col>
					<h2>Comments</h2>
					{comments.map(comment => (
						<Comment key={comment.id} comment={comment} postId={id} />
					))}
				</Col>
			</Row>

			<Row className='my-4'>
				<Col>
					<Form>
						<Form.Group controlId='newComment'>
							<Form.Label>Add a Comment</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								value={newComment}
								onChange={e => setNewComment(e.target.value)}
							/>
						</Form.Group>
						<Button
							variant='success'
							className='mt-3'
							onClick={handleAddComment}
						>
							Submit Comment
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Post
