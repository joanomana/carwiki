'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from '@/components/NavBar';
import Cars from '@/components/Cars';
import Brands from '@/components/Brands';
import View from '@/components/View';
import Review from '@/components/Review';
import Footer from "@/components/Footer";

export default function Home() {
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState("view");

    

    const handleNavigation = (page) => {
        router.push(`/?page=${page}`);
        setSelectedPage(page);
    };

    const renderContent = () => {
        switch (selectedPage) {
            case "cars":
                return <Cars />;
            case "brands":
                return <Brands />;
            case "review":
                return <Review />;
            default:
                return <View />;
        }
    };

    return (
        <div>
            <Nav onNavigate={handleNavigation} />
            <main className="main">
                {renderContent()}
            </main>
            <Footer/>
        </div>
    );
}
