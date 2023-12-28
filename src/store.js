import { reactive } from "vue";

function defineStore (data = {}, methods) {
	const state = reactive(data)
	 const store = new Proxy(state, {
		get: (state, prop) => (typeof state[prop] === 'function') ?	(args) =>  ( args ? state[prop](args, data) : state[prop](data) ) : state[prop], 
		set: (state, prop, value) => state[prop] = value		
	});

	return new Proxy(store, {
		apply: function(store, thisArg, argumentList) {
		 return store['thisArg'](argumentList,  state)
		}
	})
}

const store = {
	count: 0, 
	user: { name: 'pepito', lastname: 'perez'},
}
const methods = {
	getName: (state) => 'my name is :'+ state.user.name,
	getFullName: (args, state) => state.user.name + args.separator + args.lastname	
}


export default defineStore({...store, ...methods})
