import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const UpdatePostForm = ({ post, categories, onUpdate }) => {
	const [updatedPost, setUpdatedPost] = useState({
		title: post.title,
		content: post.content,
		categoryId: +post.categoryId,
	})

	const handleInputChange = e => {
		const { name, value } = e.target
		setUpdatedPost(prevPost => ({
			...prevPost,
			[name]: value,
		}))
	}

	const handleSaveChanges = () => {
		onUpdate(updatedPost)
	}

	return (
		<Form>
			<Form.Group controlId='postTitle'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type='text'
					name='title'
					value={updatedPost.title}
					onChange={handleInputChange}
				/>
			</Form.Group>

			<Form.Group controlId='postContent' className='mt-3'>
				<Form.Label>Content</Form.Label>
				<Form.Control
					as='textarea'
					name='content'
					value={updatedPost.content}
					onChange={handleInputChange}
					rows={5}
				/>
			</Form.Group>

			<Form.Group controlId='postCategory' className='mt-3'>
				<Form.Label>Category</Form.Label>
				<Form.Control
					as='select'
					name='categoryId'
					value={updatedPost.categoryId || ''}
					onChange={handleInputChange}
				>
					<option value=''>Select category</option>
					{categories.map(category => (
						<option key={category.id} value={category.id}>
							{category.title}
						</option>
					))}
				</Form.Control>
			</Form.Group>

			<Button className='mt-3' onClick={handleSaveChanges}>
				Save Changes
			</Button>
		</Form>
	)
}

export default UpdatePostForm
