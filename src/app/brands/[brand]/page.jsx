"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import style from "@/style/brandDetail.module.css";

export default function BrandDetail() {
    const { brand } = useParams();
    const router = useRouter();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const logoUrl = `/brands/${brand}.png`;
    const capitalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const formattedBrand = brand.replace(/\s+/g, "-");
                const response = await fetch(`/api/info?brand=${encodeURIComponent(formattedBrand)}`);

                const data = await response.json();
    
                if (data.error) {
                    throw new Error(data.error);
                }
    
                if (!data.Trims || data.Trims.length === 0) {
                    Swal.fire({
                        icon: "info",
                        title: "No models found",
                        text: `There are no models available for "${brand}".`,
                    });
                    setVehicles([]);
                    return;
                }
    
                const grouped = {};
    
                data.Trims.forEach((model) => {
                    const name = model.model_name;
    
                    if (!grouped[name]) {
                        grouped[name] = {
                            ...model,
                            model_years: [model.model_year],
                        };
                    } else {
                        grouped[name].model_years.push(model.model_year);
                    }
                });
    
                const result = Object.values(grouped);
                setVehicles(result);
            } catch (error) {
                console.error("Error fetching models:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to load models. Please try again later.",
                });
                setVehicles([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchModels();
    }, [brand]);
    
    
    

    const showDetails = (vehicle) => {
        Swal.fire({
            title: `${vehicle.model_name}`,
            html: `
                <p><strong>Available Years:</strong> ${vehicle.model_years?.join(", ") || "N/A"}</p>
                <p><strong>Body Type:</strong> ${vehicle.model_body || "N/A"}</p>
                <p><strong>Fuel Type:</strong> ${vehicle.model_engine_fuel || "N/A"}</p>
            `,
            confirmButtonText: "Close",
        });
    };
    

    if (loading) return <p className={style.loading}>Loading...{capitalizedBrand}...</p>;

    return (

        <div className={style.container}>
            <button onClick={() => router.push("/?page=brands")} className={style.backButton}>
                ← Back
            </button>
            <div className={style.header}>
                <img src={logoUrl} alt={brand} className={style.logo} />
                <h1 className={style.title}>{capitalizedBrand}</h1>
                <p className={style.subtitle}>Available models</p>
            </div>

            <div className={style.grid}>
            {vehicles.map((car, index) => (
                <div
                    key={index}
                    onClick={() => showDetails(car)}
                    className={style.card}
                >
                    <h3 className={style.modelName}>{car.model_name}</h3>
                    <p className={style.modelYear}>
                        Years: {car.model_years.sort((a, b) => b - a).join(", ")}
                    </p>
                </div>
            ))}
            </div>
        </div>
    );
}
