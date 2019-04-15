'use strict';
import Tabella from './bitabella.js';
import BiTabellaFunctions from "../functions/tabella.js";

//Gestione symfony di passaggio parametri tra twig e javascript di parametri in attribute data-*
document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    var nomecontroller = BiTabellaFunctions.getMainTabella();
    let tab = new Tabella(nomecontroller);
    tab.caricatabella();
    //dumpParametriTabella(nomecontroller);
});
