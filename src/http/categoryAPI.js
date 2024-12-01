import { $host, $authHost } from './index'

const API_URL = '/api/categories'

export const fetchCategories = async () => {
	const response = await $authHost.get(API_URL)
	return response.data
}

export const fetchPostsByCategory = async categoryId => {
	const response = await $authHost.get(`${API_URL}/${categoryId}/posts`)
	return response.data
}
