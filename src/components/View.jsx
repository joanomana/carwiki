import { useState, useEffect } from "react";

export default function View() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/cars"); // Haciendo fetch a la API Route de Next.js
            const result = await response.json();
            setData(result.Makes); // Accediendo solo a la propiedad 'Makes'
            console.log(result);
            
        } catch (error) {
            setError(error.message); // Manejar el error
        } finally {
            setLoading(false); // Cambiar el estado de carga
        }
    };

    useEffect(() => {
        fetchData(); // Llamar a la función fetchData cuando el componente se monte
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Car Wiki</h1>
            <p>🏠 Bienvenido a Car Wiki, tu fuente de información sobre automóviles.</p>
            <div>
                {data && (
                    <ul>
                        {data.map((make) => (
                            <li key={make.make_id}>{make.make_display}</li> 
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
