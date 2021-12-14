const setPrezzoMin = (state = null, action)=> {
    switch(action.type){
        case "SETPREZZOMIN":
            return state = action.payload;
        default: return state;
    }
}
export default setPrezzoMin