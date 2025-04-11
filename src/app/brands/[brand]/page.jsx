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
            title: `${vehicle.model_name} - ${vehicle.model_trim || ''}`,
            html: `
                <p><strong>Body Type:</strong> ${vehicle.model_body || "N/A"}</p>
                <p><strong>Fuel Type:</strong> ${vehicle.model_engine_fuel || "N/A"}</p>
                <p><strong>Engine:</strong> ${vehicle.model_engine_cc || "N/A"} cc, ${vehicle.model_engine_cyl || "N/A"} cylinders (${vehicle.model_engine_type || "N/A"})</p>
                <p><strong>Power:</strong> ${vehicle.model_engine_power_ps || "N/A"} PS @ ${vehicle.model_engine_power_rpm || "N/A"} RPM</p>
                <p><strong>Torque:</strong> ${vehicle.model_engine_torque_nm || "N/A"} Nm @ ${vehicle.model_engine_torque_rpm || "N/A"} RPM</p>
                <p><strong>Top Speed:</strong> ${vehicle.model_top_speed_kph || "N/A"} km/h</p>
                <p><strong>Acceleration (0–100 km/h):</strong> ${vehicle.model_0_to_100_kph || "N/A"} seconds</p>
                <p><strong>Transmission:</strong> ${vehicle.model_transmission_type || "N/A"}</p>
                <p><strong>Drive Type:</strong> ${vehicle.model_drive || "N/A"}</p>
                <p><strong>Seating:</strong> ${vehicle.model_seats || "N/A"} seats, ${vehicle.model_doors || "N/A"} doors</p>
                <p><strong>Weight:</strong> ${vehicle.model_weight_kg || "N/A"} kg</p>
                <p><strong>Dimensions (L×W×H):</strong> ${vehicle.model_length_mm || "N/A"} × ${vehicle.model_width_mm || "N/A"} × ${vehicle.model_height_mm || "N/A"} mm</p>
                <p><strong>Fuel Tank Capacity:</strong> ${vehicle.model_fuel_cap_l || "N/A"} liters</p>
                <p><strong>Available Years:</strong> ${vehicle.model_years?.join(", ") || "N/A"}</p>
            `,
            confirmButtonText: "Close",
            width: 600,
        });
    };
    
    

    if (loading) return <p className={style.loading}>Loading...{capitalizedBrand}...</p>;

    return (

        <div className={style.container}>
            <div className={style.header}>
                <div className={style.brandBackground}>
                    <button onClick={() => router.push("/?page=brands")} className={style.backButton}>
                        ← Back
                    </button>
                    <img src={logoUrl} alt={brand} className={style.logo} />
                </div>
                <p className={style.subtitle}>Available models</p>
            </div>

            <div className={style.grid}>
            {vehicles.map((car, index) => (
                <div
                    key={index}
                    onClick={() => showDetails(car)}
                    className={style.card}
                >
                    <h3 className={style.modelName}>{car.model_name} {car.model_trim}</h3>

                </div>
            ))}
            </div>
        </div>
    );
}
