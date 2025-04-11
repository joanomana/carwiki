import { MdOutlineReviews } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Style from "@/style/navbar.module.css";

export default function Nav({ onNavigate }) {
    return (
        <nav className={Style.navbar}>
            <div className={Style.navContent}>
                <div onClick={() => onNavigate("view")} className={Style.logo}>
                    <IoCarSport className={Style.logologo} />
                    <h1>Car Wiki</h1>
                </div>
                <div className={Style.navLinks}>
                    <a onClick={() => onNavigate("cars")} className={Style.navItem}>Cars</a>
                    <a onClick={() => onNavigate("brands")} className={Style.navItem}>Brands</a>
                    
                </div>
                <a onClick={() => onNavigate("review")} className={Style.search}>
                        <MdOutlineReviews className={Style.searchIcon} />
                        <h2>Reviews</h2>
                    </a>
            </div>

            <div className={Style.navCarousel}>
                <Flicking align="prev" bounce={30}>
                    <div className={Style.carouselItem} onClick={() => onNavigate("view")}>
                        <IoCarSport className={Style.logologo} />
                        <h1>Car Wiki</h1>
                    </div>
                    <div className={Style.carouselItem} onClick={() => onNavigate("cars")}>Cars</div>
                    <div className={Style.carouselItem} onClick={() => onNavigate("brands")}>Brands</div>
                    <div className={Style.carouselItem} onClick={() => onNavigate("review")}>
                        <MdOutlineReviews className={Style.searchIcon} />
                        <span>Reviews</span>
                    </div>
                </Flicking>
            </div>
        </nav>
    );
}
