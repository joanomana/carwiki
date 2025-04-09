import Style from "@/style/footer.module.css";

export default function Footer() {
  return (
    <footer className={Style.footer}>
      <div className={Style.footerContent}>
        <div className={Style.socialIcons}>
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://instagram.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com/in/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>

        </div>
        <p className={Style.copy}>© 2025 Joan Sebastian Omaña Suárez</p>
      </div>
    </footer>
  );
}
