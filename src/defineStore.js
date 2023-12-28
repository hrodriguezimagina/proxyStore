import { reactive } from "vue";

export default function defineStore (data) {
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
