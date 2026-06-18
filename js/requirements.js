"use strict";

const getSalesCoffee = async () => {
    const url = "https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml";
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error("Error en la red al intentar obtener el XML");  
        }
        const xmlText = await response.text();
        return xmlText;
    } catch (error) {
        console.error("Error obteniendo los datos:", error);
        return null;
    }
};