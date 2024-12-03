import { makeAutoObservable } from 'mobx'

export default class UserStore {
	user = {}
	isAuth = false
	roles = []

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user) {
		if(user === null) {
			this.user = {};
			this.setRoles([])
		} else {
			this.user = user
			this.setRoles(user.roles.map(role => role.value))
		}
	}

	setIsAuth(bool) {
		this.isAuth = bool
	}

	setRoles(roles) {
		this.roles = roles
	}

	hasRole(role) {
		return this.roles.includes(role)
	}
}
