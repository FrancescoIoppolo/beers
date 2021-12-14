import React, { useState } from 'react';
import Beers from "./../../assets/beers.json"
import {createStore} from "redux";
import rootReducer from "./../../reducers"
import { useSelector, useDispatch } from "react-redux";
import { setCat, setPrezzoMin, setPrezzoMax, setPrezzoNome, setPrezzoSconto } from "./../../action";

const store = createStore(rootReducer);


function Menu(){

const data = Array.from(Beers); 

const categoriaState = useSelector(state => state.categorie);
const prezzoMinState = useSelector(state => state.prezzoMin);
const prezzoMaxState = useSelector(state => state.prezzoMax);
const prezzoNomeState = useSelector(state => state.prezzoNome);
const prezzoSconto = useSelector(state => state.prezzoSconto);

const dispatch = useDispatch();

// SETTO GLI STATI LOCALI
const [menuDisponibilita, setmenuDisponibilita] = useState(false);
const [menuPrezzo, setmenuPrezzo] = useState(false);
const [menuCategorie, setmenuCategorie] = useState(false);
    
// CREO L'ARRAY DELLE CATEGORIE RAGGRUPPATE
const categorie = data.reduce((raggruppa, { category, name }) => {
    if (!raggruppa[category]) raggruppa[category] = [];
        raggruppa[category].push(name);
        return raggruppa;
    }, {});
     
      // FUNZIONE TOOGLE PER APRIRE E CHIUDERE LE FINEESTRE DEL EMNU

      const toogle = (menu)=> {
          if (menu === "disponibilita"){
              if (menuDisponibilita == false) {setmenuDisponibilita(true)} else {setmenuDisponibilita(false)}
          }
          if (menu === "prezzo"){
            if (menuPrezzo == false) {setmenuPrezzo(true)} else {setmenuPrezzo(false)}
          }
          if (menu === "categorie"){
            if (menuCategorie == false) {setmenuCategorie(true)} else {setmenuCategorie(false)}
          }
          
          
      }
return (
    <div className="col-1">
        <ul><div onClick={() => toogle("disponibilita")} >DISPONIBILITA' ⬇️</div>
            { menuDisponibilita && <li onClick={() => dispatch(setPrezzoSconto())}><input checked={prezzoSconto}  type="checkbox"/>In Sconto</li>}
        </ul>
        <ul><div onClick={() => toogle("prezzo")}>PREZZO ⬇️</div>
        { menuPrezzo && <><li onClick={() => dispatch(setPrezzoMin(null)) & dispatch(setPrezzoMax(20)) & dispatch(setPrezzoNome("A meno di 20 EUR"))} >A meno di 20 EUR</li>
            <li onClick={() => dispatch(setPrezzoMin(20)) & dispatch(setPrezzoMax(50)) & dispatch(setPrezzoNome("20 - 50 EUR"))}>20 - 50 EUR</li>
            <li onClick={() => dispatch(setPrezzoMin(50)) & dispatch(setPrezzoMax(100)) & dispatch(setPrezzoNome("50 - 100 EUR"))}>50 - 100 EUR</li>
            <li onClick={() => dispatch(setPrezzoMin(100)) & dispatch(setPrezzoMax(200)) & dispatch(setPrezzoNome("100 - 200 EUR"))}>100 - 200 EUR</li>
            <li onClick={() => dispatch(setPrezzoMin(200)) & dispatch(setPrezzoMax(null)) & dispatch(setPrezzoNome("200 EUR e più"))}>200 EUR e più</li></> }
        </ul>
        <ul><div onClick={() => toogle("categorie")}>CATEGORIE ⬇️</div>
        { menuCategorie &&<>{   
                Object.entries(categorie).map(([key]) => 
                <li onClick={() => dispatch(setCat(key))} key={key}>{key}</li>
                )
            }
        </>
}
        </ul>
        {(categoriaState !== "" || prezzoMinState || prezzoMaxState) && <div className='filtri'>FILTRI:</div> }
        <div className='selected'>{(categoriaState !== "")  && <div onClick={() => dispatch(setCat(""))}><span className='name'>{categoriaState}</span> <span className='close'>X</span> </div> }</div>
        <div className='selected'>{(prezzoMinState || prezzoMaxState ) &&<div onClick={() => dispatch(setPrezzoMin(null)) && dispatch(setPrezzoMax(null))}><span className='name'>{prezzoNomeState}</span> <span className='close'>X</span> </div>}</div>
    </div>
);
}
export default Menu;