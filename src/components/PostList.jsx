import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import PostItem from './PostItem' 

const PostList = observer(() => {
	const { posts } = useContext(Context)

	useEffect(() => {
		const fetchData = async () => {
			posts.setLoading(true)
			try {
				const data = await fetchPosts()
				posts.setPosts(data)
			} catch (error) {
				alert('Error fetching posts')
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
		<div className='post-list'>
			{posts.posts.length > 0 ? (
				posts.posts.map(post => <PostItem key={post.id} post={post} />)
			) : (
				<p>No posts available</p>
			)}
		</div>
	)
})

export default PostList
