"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from '@/components/NavBar';
import Cars from '@/components/Cars';
import Brands from '@/components/Brands';
import View from '@/components/View';
import Review from '@/components/Review';
import Footer from "@/components/Footer";

export default function ClientPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedPage = searchParams.get("page") || "view";

    const handleNavigation = (page) => {
        router.push(`/?page=${page}`);
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
            <Footer />
        </div>
    );
}
