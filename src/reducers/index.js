import setCat from "./setCat.js";
import setPrezzoMin from "./setPrezzoMin.js";
import setPrezzoMax from "./setPrezzoMax.js";
import setPrezzoNome from "./setPrezzoNome.js";
import setPrezzoSconto from "./setPrezzoSconto";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    categorie: setCat,
    prezzoMin: setPrezzoMin,
    prezzoMax: setPrezzoMax,
    prezzoNome: setPrezzoNome,
    prezzoSconto: setPrezzoSconto,
})

export default rootReducer