"use strict";

const processSalesCoffee = async () => {
    const xmlData = await getSalesCoffee();
    if(!xmlData){
        console.error("No se pudieron cargar los datos");
        return;
    }

    //convertir el texto a un documento xml manejable
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "application/xml");

    const records = xmlDoc.documentElement.children;
    if(records.length === 0) return;

    const tableHead = document.getElementById("table-head");
    const tableBody = document.getElementById("table-body");

    const primerRegistro = records[0];
    let headerHTML = '';
    for (let node of primerRegistro.children) {
        const columnName = node.nodeName.replace(/_/g, ' ');
        headerHTML += `<th scope="col" class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${columnName}</th>`;
    }

    tableHead.innerHTML = headerHTML;

    //Generar las filas de la tabla
    let bodyHTML = '';
    const maxRecords = Math.min(records.length, 50);

    for (let i=0; i<maxRecords; i++){
        let rowHTML = '<tr>';
        for (let node of records[i].children){
            rowHTML += `<td class="whitespace-nowrap py-4 px-4 text-sm text-gray-600">${node.textContent}</td>`;
        }
        rowHTML += '</tr>';
        bodyHTML += rowHTML;
    }

    tableBody.innerHTML += bodyHTML;
};

window.addEventListener('DOMContentLoaded', processSalesCoffee);