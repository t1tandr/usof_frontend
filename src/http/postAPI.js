import { $host } from './index'

export const getAllPosts = async (page = 1, limit = 10) => {
	const { data } = await $host.get('api/posts', {
		params: {
			page,
			limit,
		},
	})
	return data
}

export const getPostById = async id => {
	const { data } = await $host.get(`api/posts/${id}`)
	return data
}
