import { makeAutoObservable } from 'mobx'

export default class PostsStore {

	posts = [];
	categories = [];
	loading = false;
	
	constructor() {
		makeAutoObservable(this)
	}

	setPosts(postList) {
		this.posts = postList;
	}
	setCategories(categoriesList) {
		this.categories = categoriesList;
	}
	setLoading(bool) {
		this.loading = bool
	}
}
