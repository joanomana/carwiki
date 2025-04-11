import Style from "@/style/footer.module.css";

export default function Footer() {
  return (
    <footer className={Style.footer}>
      <div className={Style.footerContent}>
        <div className={Style.socialIcons}>
          <a
            href="https://github.com/joanomana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/joan-sebastian-oma%C3%B1a-suarez-52b7a3256/"
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
