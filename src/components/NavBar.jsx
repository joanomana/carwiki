import { MdOutlineReviews } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import Style from "@/style/navbar.module.css";

export default function Nav({ onNavigate }) {

    return (
        <nav className={Style.navbar}>
            <div onClick={()=> onNavigate("view")} className={Style.logo}>
                <IoCarSport className={Style.logologo} />
                <h1>Car Wiki</h1>
            </div>
            <div className={Style.navLinks}>
                <a onClick={() => onNavigate("cars")} className={Style.navItem}>Cars</a>
                <a onClick={() => onNavigate("brands")} className={Style.navItem}>Brands</a>
            </div>
            <a onClick={()=> onNavigate("review")} className={Style.search}>
                <MdOutlineReviews  className={Style.searchIcon} />
                <h2>Reviews</h2>
            </a>
        </nav>
    );
}
