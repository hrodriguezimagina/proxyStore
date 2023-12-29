import { reactive } from "vue";

export default function defineStore (data) {
	
	const initialState = data;
	let state = reactive({...data})
	const store = new Proxy(state, {
		get: (state, prop) => (typeof state[prop] === 'function') ?	(args) =>  ( args ? state[prop](args, state) : state[prop](state) ) : ( prop == 'state' ? state : state[prop]),
		set: function (state, prop, value) {
			console.dir({ 'prop': prop, 'value': value})
			return state[prop] = value 
		} 		
	});

	store.reset = () => Object.assign(state, initialState)

	return new Proxy(store, {
		apply: function(store, thisArg, argumentList) {
		 return store['thisArg'](argumentList,  state)
		}
	})
}
