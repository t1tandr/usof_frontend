import React, { useContext, useEffect } from 'react'
import { Spinner, Carousel } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Context } from '..'
import { fetchCategories } from '../http/categoryAPI'

const CategoryBar = observer(() => {
	const { posts } = useContext(Context)
	const navigate = useNavigate()

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

	// Разделяем категории на страницы (по 3 блока на каждой странице)
	const chunkCategories = (categories, chunkSize) => {
		const result = []
		for (let i = 0; i < categories.length; i += chunkSize) {
			result.push(categories.slice(i, i + chunkSize))
		}
		return result
	}

	const categoryChunks = chunkCategories(posts.categories, 3) // 3 категории на слайд

	return (
		<div className='category-bar mb-4'>
			<h3>Categories</h3>
			<Carousel
				data-bs-theme='dark'
				indicators={false}
				nextIcon={
					<span aria-hidden='true' className='carousel-control-next-icon' />
				}
				prevIcon={
					<span aria-hidden='true' className='carousel-control-prev-icon' />
				}
			>
				{categoryChunks.map((chunk, index) => (
					<Carousel.Item key={index}>
						<div className='d-flex justify-content-center'>
							{chunk.map(category => (
								<div
									key={category.id}
									className='category-block mx-2'
									onClick={() => navigate(`/posts?categoryId=${category.id}`)}
									style={{
										cursor: 'pointer',
										padding: '15px',
										textAlign: 'center',
										border: '1px solid #ddd',
										borderRadius: '5px',
										backgroundColor: '#f9f9f9',
										flex: '1 0 30%',
										maxWidth: '30%',
										transition: 'transform 0.3s ease',
									}}
								>
									<span style={{ color: '#333', fontWeight: 'bold' }}>
										{category.title}
									</span>
								</div>
							))}
						</div>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	)
})

export default CategoryBar
