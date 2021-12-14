
const setPrezzoSconto = (state = false, action)=> {
    switch(action.type){
        case "SETPREZZOSCONTO":
            return state = !state
        default: return state;
    }
}
export default setPrezzoSconto
