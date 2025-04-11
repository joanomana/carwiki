"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Style from "@/style/brands.module.css";

const availableBrands = [
    "abarth",
    "ac",
    "acura",
    "alfa romeo",
    "alpina",
    "alpine",
    "alvis",
    "amc",
    "ariel",
    "ascari",
    "aston martin",
    "audi",
    "austin",
    "autobianchi",
    "bentley",
    "berkeley",
    "bitter",
    "bmw",
    "brilliance",
    "bristol",
    "bugatti",
    "buick",
    "cadillac",
    "caterham",
    "chevrolet",
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
    "land rover",
    "lexus",
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
    "saturn",
    "scion",
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
    "willys-overland",
    "xedos",
    "zastava",
    "zaz",
    "zenvo"
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

                const filteredBrands = result.Makes
                    .filter((brand) =>
                        availableBrands.includes(brand.make_display.toLowerCase())
                    )
                    .map((brand) => ({
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
            <div className={Style.header}>
                <h1>Cars Brands</h1>
                <p>Click on a brand to see the available models.</p>
            </div>
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
                        
                    </div>
                ))}
            </div>
        </div>
    );
}



