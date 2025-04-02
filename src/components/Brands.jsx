"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Style from "@/style/brands.module.css"; 

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); 

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch("/api/brands"); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                
                // Filtrar marcas y generar URL de imagen
                const filteredBrands = result.Makes.map((brand) => {
                    const brandName = brand.make_display.toLowerCase().replace(/\s+/g, "-"); 
                    const logoUrl = `https://www.carlogos.org/logo/${brandName}-logo.png`;
                    
                    return { ...brand, logoUrl };
                });

                setBrands(filteredBrands);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const navigateToModels = (makeId) => {
        router.push(`/cars/${makeId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={Style.container}>
            <h1>Marcas de Autos</h1>
            <p>Haz clic en una marca para ver los modelos disponibles.</p>
            <div className={Style.brandList}>
                {brands.map((brand) => (
                    
                    <div
                        key={brand.make_id}
                        className={Style.brandItem}
                        onClick={() => navigateToModels(brand.make_id)}
                    >
                        <img
                            src={brand.logoUrl}
                            alt={brand.make_display}
                            className={Style.brandLogo}
                            onError={(e) => e.target.style.display = "none"} 
                        />
                        <p>{brand.make_display}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
