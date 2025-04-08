import { CiSearch } from "react-icons/ci";
import { IoCarSport } from "react-icons/io5";
import Style from "@/style/navbar.module.css";

export default function Nav({ onNavigate }) {
    function handleSearch() {
        // Aquí puedes manejar búsqueda si quieres después
    }

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
            <div onClick={handleSearch} className={Style.search}>
                <h2>Search</h2>
                <CiSearch className={Style.searchIcon} />
            </div>
        </nav>
    );
}
