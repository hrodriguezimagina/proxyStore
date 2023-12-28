import defineStore from "./defineStore"

const store = {
	count: 0, 
	user: { name: 'pepito', lastname: 'perez'},
}
const methods = {
	getName: (state) => 'my name is :'+ state.user.name,
	getFullName: (args, state) => state.user.name + args.separator + args.lastname	
}

export default defineStore({...store, ...methods})
