const setPrezzoMax = (state = null, action)=> {
    switch(action.type){
        case "SETPREZZOMAX":
            return state = action.payload;
        default: return state;
    }
}
export default setPrezzoMax