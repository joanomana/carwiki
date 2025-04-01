'use client';
import { useState } from "react";
import Nav from '@/components/NavBar';
import Cars from '@/components/Cars';
import Brands from '@/components/Brands';
import View from '@/components/View';

export default function Home() {
    const [selectedPage, setSelectedPage] = useState("home");

    const renderContent = () => {
        switch (selectedPage) {
            case "cars":
                return <Cars />;
            case "brands":
                return <Brands />;
            default:
                return <View />;
        }
    };

    return (
        <div>
            <Nav setSelectedPage={setSelectedPage} />
            <main className="main">
                {renderContent()}
            </main>
        </div>
    );
}
