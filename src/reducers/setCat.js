const setCat = (state = "", action)=> {
    switch(action.type){
        case "SETCAT":
            return state = action.payload;
        default: return state;
    }
}
export default setCat







