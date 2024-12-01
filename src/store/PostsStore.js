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
	setUser(user) {
		this.user = user
	}
}
