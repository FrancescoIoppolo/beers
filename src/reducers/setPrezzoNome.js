const setPrezzoNome = (state = null, action)=> {
    switch(action.type){
        case "SETPREZZONOME":
            return state = action.payload;
        default: return state;
    }
}
export default setPrezzoNome