import { $host } from './index'

// Поставить лайк посту
export const likePost = async postId => {
	const { data } = await $host.post(`api/posts/${postId}/like`)
	return data
}

// Удалить лайк с поста
export const unlikePost = async postId => {
	const { data } = await $host.delete(`api/posts/${postId}/like`)
	return data
}

// Получить количество лайков для поста
export const countLikesForPost = async postId => {
	const { data } = await $host.get(`api/posts/${postId}/likes`)
	return data
}

// Получить список пользователей, которые лайкнули пост
export const getUsersWhoLikedPost = async postId => {
	const { data } = await $host.get(`api/posts/${postId}/users`)
	return data
}
