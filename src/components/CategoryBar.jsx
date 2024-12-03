import React, { useContext, useEffect } from 'react'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchCategories } from '../http/categoryAPI'

const CategoryBar = observer(({ onCategoryChange }) => {
	const { posts } = useContext(Context)

	useEffect(() => {
		const fetchData = async () => {
			posts.setLoading(true)
			try {
				let data = await fetchCategories()
				posts.setCategories(data)
			} catch (error) {
				alert(error.response?.data?.message || 'Failed to fetch categories')
			} finally {
				posts.setLoading(false)
			}
		}

		fetchData()
	}, [posts])

	if (posts.loading) {
		return <Spinner animation='border' />
	}

	return (
		<div style={{ marginTop: '20px' }} className='category-bar mb-4'>
			<h3>Categories</h3>
			<ButtonGroup className='d-flex flex-wrap'>
				<Button
					variant='secondary'
					onClick={() => onCategoryChange(null)} // Сброс категории
					className='m-2'
				>
					All
				</Button>
				{posts.categories.map(category => (
					<Button
						key={category.id}
						variant='primary'
						onClick={() => onCategoryChange(category.id)}
						className='m-2'
					>
						{category.title}
					</Button>
				))}
			</ButtonGroup>
		</div>
	)
})

export default CategoryBar
