const Footer = () => {
  return (
    <>
      <div className=" bg-primary text-white">
        <footer className="footer px-10 py-28 container mx-auto">
          <aside>
            <h1 className="font-heading font-semibold text-4xl text-white">
              Street<span className="font-normal">Wise</span>
            </h1>
          </aside>
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Footer;
