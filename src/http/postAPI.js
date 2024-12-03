import { $host, $authHost } from './index'

// Получить все посты с пагинацией
export const getAllPosts = async (page = 1, limit = 10) => {
	const { data } = await $host.get('api/posts', {
		params: { page, limit },
	})
	return data
}

export const getPostsByUserId = async (userId, page = 1, limit = 10) => {
	const { data } = await $authHost.get(`api/posts/user/${userId}`, {
		params: {page, limit},
	});
	return data
}

// Получить пост по ID
export const getPostById = async id => {
	const { data } = await $host.get(`api/posts/${id}`)
	return data
}

// Создать новый пост
export const createPost = async (postData, token) => {
	const { data } = await $authHost.post('api/posts', postData,)
	return data
}

// Обновить пост
export const updatePost = async (id, updateData) => {
	const { data } = await $authHost.patch(`api/posts/${id}`, updateData)
	return data
}

// Удалить пост
export const deletePost = async (id, token) => {
	const { data } = await $authHost.delete(`api/posts/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return data
}

// Получить комментарии для поста
export const getCommentsForPost = async postId => {
	const { data } = await $authHost.get(`api/posts/${postId}/comments`)
	return data
}

// Добавить комментарий к посту
export const createCommentForPost = async (postId, commentData, token) => {
	const { data } = await $authHost.post(
		`api/posts/${postId}/comments`,
		commentData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return data
}

// Лайкнуть пост
export const likePost = async (postId, token) => {
	const { data } = await $authHost.post(`api/posts/${postId}/like`, null, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return data
}

// Удалить лайк с поста
export const unlikePost = async (postId, token) => {
	const { data } = await $authHost.delete(`api/posts/${postId}/like`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return data
}

// Получить количество лайков для поста
export const countPostLikes = async postId => {
	const { data } = await $authHost.get(`api/posts/${postId}/likes`)
	return data
}

// Получить список пользователей, лайкнувших пост
export const getUsersWhoLikedPost = async postId => {
	const { data } = await $authHost.get(`api/posts/${postId}/users`)
	return data
}
