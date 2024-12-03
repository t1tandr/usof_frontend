import React, { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CategoryBar from '../components/CategoryBar'
import PostList from '../components/PostList'
import { Context } from '..'
import { Spinner } from 'react-bootstrap'
import { fetchPostsByCategory } from '../http/categoryAPI'
import { getAllPosts, createPost } from '../http/postAPI'

const Posts = () => {
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [newPost, setNewPost] = useState({
		title: '',
		content: '',
		categoryId: null,
		image: null,
	})
	const { posts } = useContext(Context)

	const handleCategoryChange = category => {
		setSelectedCategory(category)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewPost({ ...newPost, [name]: value })
	}

	const handleImageChange = e => {
		setNewPost({ ...newPost, image: e.target.files[0] })
	}

	const handleSubmit = async () => {
		const formData = new FormData()
		formData.append('title', newPost.title)
		formData.append('content', newPost.content)
		formData.append('categoryId', newPost.categoryId)
		if (newPost.image) formData.append('image', newPost.image)

		try {
			await createPost(formData) // Отправка данных на сервер
			alert('Post created successfully!')
			setShowCreateForm(false)
			setNewPost({ title: '', content: '', categoryId: null, image: null })
		} catch (error) {
			alert('Error creating post')
		}
	}

	useEffect(() => {
		const fetchPosts = async () => {
			posts.setLoading(true)
			let data
			try {
				if (selectedCategory) {
					data = await fetchPostsByCategory(selectedCategory)
					posts.setPosts(data)
				} else {
					data = await getAllPosts()
					posts.setPosts(data.data)
				}
			} catch (error) {
				alert('Error fetching posts')
			} finally {
				posts.setLoading(false)
			}
		}

		fetchPosts()
	}, [selectedCategory])

	if (posts.loading) {
		return <Spinner animation='border' />
	}

	return (
		<Container>
			<CategoryBar onCategoryChange={handleCategoryChange} />
			<Button
				variant='primary'
				onClick={() => setShowCreateForm(prev => !prev)}
				className='mb-3'
			>
				{showCreateForm ? 'Cancel' : 'Create Post'}
			</Button>
			{showCreateForm && (
				<Form className='mb-4'>
					<Form.Group controlId='postTitle'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter post title'
							name='title'
							value={newPost.title}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='postContent' className='mt-3'>
						<Form.Label>Content</Form.Label>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Enter post content'
							name='content'
							value={newPost.content}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId='postCategory' className='mt-3'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							as='select'
							name='categoryId'
							value={newPost.categoryId || ''}
							onChange={handleInputChange}
						>
							<option value=''>Select category</option>
							{posts.categories.map(category => (
								<option key={category.id} value={category.id}>
									{category.title}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='postImage' className='mt-3'>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type='file'
							accept='image/*'
							onChange={handleImageChange}
						/>
					</Form.Group>
					<Button variant='success' className='mt-3' onClick={handleSubmit}>
						Submit Post
					</Button>
				</Form>
			)}
			<PostList posts={posts} />
		</Container>
	)
}

export default Posts
