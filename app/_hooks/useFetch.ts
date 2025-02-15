"use client";
import { useEffect, useState } from 'react';
/**
 *  
 * @param {string} dataUrl URL de l'API
 */
function useFetch(dataUrl: string) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(dataUrl); // On récupère les données de l'API
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`); // On affiche une erreur si le statut n'est pas OK
                } else {
                    setData(await response.json()); // On convertit les données en JSON
                }
            } catch (error) {
                setError(`Une erreur est survenue lors du chargement des données : ${error}`); // On affiche l'erreur
            } finally {
                setLoading(false); // On passe loading à false 
            }
        };
        fetchData();

    }, [dataUrl]);
    return { data, loading, error };
}

export default useFetch;