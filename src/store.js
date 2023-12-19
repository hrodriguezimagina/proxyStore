import { reactive } from "vue";

function defineStore (data = {}) {
	const state = reactive(data)		
	return new Proxy(state, {
		get: (state, prop) => (typeof state[prop] === 'function') ?	() => state[prop](data) : state[prop], 
		set: (state, prop, value) => state[prop] = value		
	});	
}

const store = {
	count: 0, 
	user: { name: 'pepito', lastname: 'perez'},
}
const methods = {
	getName: (state) => state.user.name + '/' + state.user.lastname,
	counterMinus: (state) => state.count - 1,
	doubleCounter: (state) => state.count = state.count * 2
}

export default defineStore({...store, ...methods})