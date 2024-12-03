import { $host, $authHost } from './index'

// Получить комментарий по ID
export const getCommentById = async commentId => {
	const { data } = await $authHost.get(`api/comments/${commentId}`)
	return data
}

export const createComment = async (postId, commentData) => {
	const { data } = await $authHost.post(
		`api/posts/${postId}/comments`,
		commentData
	)
	return data
}

// Получить все лайки для комментария
export const getAllLikesForComment = async commentId => {
	const { data } = await $authHost.get(`api/comments/${commentId}/like`)
	return data
}

// Поставить лайк комментарию
export const likeComment = async commentId => {
	const { data } = await $authHost.post(`api/comments/${commentId}/like`)
	return data
}

// Удалить лайк с комментария
export const unlikeComment = async commentId => {
	const { data } = await $authHost.delete(`api/comments/${commentId}/like`)
	return data
}

// Обновить комментарий
export const updateComment = async (commentId, content) => {
	const { data } = await $authHost.patch(`api/comments/${commentId}`, {
		content,
	})
	return data
}

// Удалить комментарий
export const deleteComment = async commentId => {
	const { data } = await $authHost.delete(`api/comments/${commentId}`)
	return data
}

export const getAllCommentsForPost = async postId => {
    const { data } = await $authHost.get(`api/posts/${postId}/comments`)
    return data;
}
