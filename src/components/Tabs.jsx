"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/style/tabs.module.css";
import Flicking from "@egjs/react-flicking";
import Swal from "sweetalert2";

const categories = [
    { id: "brands", label: "Popular Brands" },
    { id: "coupe", label: "Coupe" },
    { id: "sedan", label: "Sedan" },
    { id: "suv", label: "SUV" },
    { id: "pickup", label: "Pickup" },
    { id: "crossover", label: "Crossover" },
    { id: "minivan", label: "Minivan" },
];

export default function CategorySlider() {
    const [activeCategory, setActiveCategory] = useState("brands");
    const [options, setOptions] = useState([]);
    const [year, setYear] = useState(2013);
    const flickingRef = useRef(null);

    const handleCategoryClick = (catId, index) => {
        setActiveCategory(catId);
        flickingRef.current?.moveTo(index, 300);
    };

    useEffect(() => {
        const fetchData = async () => {
        if (activeCategory === "brands") {
            setOptions([]);
            return;
        }

        try {
            const res = await fetch(`/api/models?type=${activeCategory}&from=${year}`);
            const data = await res.json();
            setOptions(data);
        } catch (error) {
            console.error("Error data:", error);
            setOptions([]);
        }
        };

        fetchData();
    }, [activeCategory, year]);

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value, 10));
    };

    const handleCardClick = (opt) => {
        Swal.fire({
            title: `${opt.make_display} ${opt.model_name} (${opt.model_year})`,
            html: `
                <strong>Body style:</strong> ${opt.model_body}<br/>
                <strong>Engine:</strong> ${opt.model_engine_cc}cc, ${opt.model_engine_type} ${opt.model_engine_cyl} cyl.<br/>
                <strong>Fuel type:</strong> ${opt.model_engine_fuel}<br/>
                <strong>Transmission:</strong> ${opt.model_transmission_type}<br/>
                <strong>Drive type:</strong> ${opt.model_drive}<br/>
                <strong>Doors:</strong> ${opt.model_doors} | <strong>Seats:</strong> ${opt.model_seats}<br/>
                <strong>Weight:</strong> ${opt.model_weight_kg} kg
            `,
            icon: "info",
            confirmButtonText: "Close",
        });
    };

    return (
        <div className={styles.container}>
        <div className={styles.sliderWrapper}>
            <Flicking align="prev" bounce={30} bound moveType="freeScroll" ref={flickingRef}>
            {categories.map((cat, index) => (
                <div key={cat.id} className="flicking-panel">
                <button
                    className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ""}`}
                    onClick={() => handleCategoryClick(cat.id, index)}
                >
                    {cat.label}
                </button>
                </div>
            ))}
            </Flicking>
        </div>

        {activeCategory !== "brands" && (
            <div className={styles.yearSelector}>
            <label htmlFor="year">Select a year: </label>
            <select id="year" value={year} onChange={handleYearChange}>
                {Array.from({ length: 2013 - 1994 + 1 }, (_, i) => {
                const y = 2013 - i;
                return (
                    <option key={y} value={y}>
                    {y}
                    </option>
                );
                })}
            </select>
            </div>
        )}

        <div className={styles.options}>
            {activeCategory === "brands" ? (
            <>
                <div className={styles.optionCard}>Toyota</div>
                <div className={styles.optionCard}>Ford</div>
                <div className={styles.optionCard}>BMW</div>
                <div className={styles.optionCard}>Chevrolet</div>
                <div className={styles.optionCard}>Honda</div>
            </>
            ) : options.length > 0 ? (
            options.map((opt, i) => (
                <div
                key={i}
                className={styles.optionCard}
                onClick={() => handleCardClick(opt)}
                style={{ cursor: "pointer" }}
                >
                <div>{opt.model_make_display}</div>
                <div>{opt.model_name}</div>
                </div>
            ))
            ) : (
            <p>No data for this category and year.</p>
            )}
        </div>
        </div>
    );
}
