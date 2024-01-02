import { reactive } from "vue";
import cache from '@imagina/qsite/_plugins/cache'

const config = {
	cache: true,
	id: 'proxy-store'
}

let state;
let store;

function returnFunction(target, prop, args = false){
	return args ? target[prop](args, state) : target[prop](state)
}

function returnProp(target, prop){
	return ( prop == 'state' ? state : target[prop])
}

function getValue(target, prop){
	return (typeof target[prop] === 'function') ? (args) =>  returnFunction(target, prop, args) : returnProp(target, prop)
}

function setValue(target, prop, value){
	target[prop] = value; 
	setCache(target, prop, value)
	return true
}

function setCache(target, prop, value){
	if (typeof target[prop] !== 'function') {
		if( state.hasOwnProperty(prop)){		
			cache.set('proxy-store', state[prop]);
		}		
	}
}


export default function defineStore (data) {
	state = reactive(data)

	store = new Proxy(state, {
		get: (target, prop) => getValue(target, prop),
		set: (target, prop, value) => setValue(target, prop, value)
	});	

	return new Proxy(store, {
		apply: function(store, thisArg, argumentList) {
		 return store['thisArg'](argumentList, state)
		}
	})
}



 
