import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import PostItem from './PostItem' 
import { getAllPosts } from '../http/postAPI'

const PostList = observer(({ posts }) => {
	// if (posts.loading) {
	// 	return <Spinner animation='border' />
	// }

	if (!posts.posts || posts.posts.length === 0) {
		return <p>No posts available</p>
	}

	return (
		<div className='post-list'>
			{posts.posts.map(post => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	)
})


export default PostList
