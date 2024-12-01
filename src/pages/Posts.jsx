import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import CategoryBar from '../components/CategoryBar'
import PostList from '../components/PostList'

const Posts = () => {
  return (
    <Container>
      <CategoryBar/>
      <PostList></PostList>
    </Container>
  )
}

export default Posts
