"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Style from "@/style/brands.module.css";

// Lista de marcas con imagen disponible
const availableBrands = [
    "berkeley",
    "bitter",
    "bmw",
    "brilliance",
    "bugatti",
    "bristol",
    "buick",
    "cadillac",
    "chevrolet",
    "caterham",
    "chrysler",
    "citroen",
    "daf",
    "daihatsu",
    "dodge",
    "eagle",
    "ferrari",
    "fiat",
    "ford",
    "gaz",
    "geely",
    "gmc",
    "holden",
    "honda",
    "hudson",
    "hummer",
    "hyundai",
    "infiniti",
    "innocenti",
    "isuzu",
    "jaguar",
    "jeep",
    "jensen",
    "kia",
    "koenigsegg",
    "lada",
    "lamborghini",
    "lancia",
    "lexus",
    "land rover",
    "lincoln",
    "lotus",
    "mahindra",
    "marcos",
    "maserati",
    "maybach",
    "mazda",
    "mclaren",
    "mercedes-benz",
    "mercury",
    "mg",
    "mini",
    "mitsubishi",
    "morgan",
    "morris",
    "nissan",
    "noble",
    "opel",
    "pagani",
    "panoz",
    "peugeot",
    "pininfarina",
    "plymouth",
    "pontiac",
    "porsche",
    "proton",
    "renault",
    "riley",
    "rolls-royce",
    "saab",
    "saleen",
    "samsung",
    "scion",
    "saturn",
    "seat",
    "simca",
    "singer",
    "skoda",
    "smart",
    "ssangyong",
    "subaru",
    "suzuki",
    "talbot",
    "tesla",
    "toyota",
    "vauxhall",
    "vector",
    "volkswagen",
    "volvo",
    "wartburg",
    "westfield",
    "xedos",
    "willys-overland",
    "zastava",
    "zaz",
    "zenvo",
    "abarth",
    "ac",
    "acura",
    "alfa romeo",
    "alpina",
    "alpine",
    "alvis",
    "amc",
    "ascari",
    "ariel",
    "aston martin",
    "audi",
    "austin",
    "autobianchi"
];

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

                const filteredBrands = result.Makes.map((brand) => ({
                    ...brand,
                    logoUrl: `/brands/${brand.make_display.toLowerCase()}.png`
                }));
                
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
                        />
                        <p>{brand.make_display}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}



