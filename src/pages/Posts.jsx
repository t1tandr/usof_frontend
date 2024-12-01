import React, { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/esm/Container'
import CategoryBar from '../components/CategoryBar'
import PostList from '../components/PostList'
import { Context } from '..'
import { Spinner } from 'react-bootstrap'
import { fetchPostsByCategory } from '../http/categoryAPI'
import { getAllPosts } from '../http/postAPI'

const Posts = () => {
	const [selectedCategory, setSelectedCategory] = useState(null)
	const { posts } = useContext(Context);

	const handleCategoryChange = (category) => {
		setSelectedCategory(category)
	}

	useEffect(() => {
		const fetchPosts = async () => {
			posts.setLoading(true)
      let data;
        try {
          if(selectedCategory) {
            data = await fetchPostsByCategory(selectedCategory)
            posts.setPosts(data)
          } else {
            data = await getAllPosts()
            posts.setPosts(data.data)
          }
          console.log(data.data)
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
			<PostList posts={posts} />
		</Container>
	)
}

export default Posts
