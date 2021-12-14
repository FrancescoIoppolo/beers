import Menu from "../menu/Menu.js"
import React, { useState } from 'react';
import Beers from "./../../assets/beers.json"
import {createStore} from "redux";
import { useSelector, useDispatch } from "react-redux";

import rootReducer from "./../../reducers"

const store = createStore(rootReducer);

function Body() {

const data = Array.from(Beers);

const children = data;

const categoriaState = useSelector(state => state.categorie);
const prezzoMinState = useSelector(state => state.prezzoMin);
const prezzoMaxState = useSelector(state => state.prezzoMax);
const prezzoSconto = useSelector(state => state.prezzoSconto);

const [currentPage, setCurrentPage] = useState(1);
const [BeersForPage] = useState(30);

const [pageProdotto, setPageProdotto] = useState(false);
const [prodotto, setProdotto] = useState();

const handleClick = (number) =>{
    
    setCurrentPage(number)

  }

// LOGICA PER VISUALIZZAZIONE DI PAGINA
const indexOfLastBeer = currentPage * BeersForPage;
const indexOfFirstBeer = indexOfLastBeer - BeersForPage;
const currentBeers = data.filter(beer => beer.category.includes(categoriaState) && (!prezzoMinState || prezzoMinState <= beer.price) && (!prezzoMaxState || prezzoMaxState >= beer.price) && (beer.on_sale == prezzoSconto)).slice(indexOfFirstBeer, indexOfLastBeer);

// LOGICA PER VISUALIZZARE IL NUMERO DI PAGINA
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(data.filter(beer => beer.category.includes(categoriaState) && (!prezzoMinState || prezzoMinState <= beer.price) && (!prezzoMaxState || prezzoMaxState >= beer.price) && (beer.on_sale == prezzoSconto)).length / BeersForPage); i++) {
  pageNumbers.push(i);
}

const renderPageNumbers = pageNumbers.map(number => {
    return (
      <span className="numeroDiPagina" key={number} id={number} onClick={() => handleClick(number)} >
        {number} - 
      </span>
    );
  });

return (
    <div className="body">
        <div className="row">
            <Menu/>
            <div className="col-2">
                <div className="listProducts">
                    {currentBeers.map(filterBeer => {
                    return(
                        <div onClick={() => setProdotto(filterBeer) & setPageProdotto(true) }>
                            <div className="image">
                                <img src={filterBeer.image_url} alt=""></img>
                            </div>
                            <div className="name">{filterBeer.name}</div>
                            <div className="price">{filterBeer.price}</div>
                         </div>
                         
                    );})} 
                </div>
                { pageProdotto && 
                    <div className="overlayProdotto"> 
                        <div onClick={() => setPageProdotto(false)}>🔙 BACK</div>
                        <div className="imageProdotto">
                                <img src={prodotto.image_url} alt=""></img>
                        </div>
                        <div>
                        <div className="name">{prodotto.name}</div>
                        <div className="price">{prodotto.price}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
        <div className="numerazione">
            <ul id="page-numbers">
                {!pageProdotto && renderPageNumbers}
            </ul>
        </div>
    </div>
    );
}

export default Body;
