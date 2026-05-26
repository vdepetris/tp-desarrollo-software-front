import "./Header.css";

function Header() {

  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 260"
            className="header__logo-svg"
            aria-label="NUTRAX Suplementos"
            role="img"
          >
            <defs>
              <style>
                {`
                  .text-nutra {
                    font-family: 'Arial Black', 'Impact', 'Helvetica Neue', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    fill: #FFFFFF;
                    font-size: 112px;
                    letter-spacing: -2px;
                  }

                  .text-x {
                    font-family: 'Arial Black', 'Impact', 'Helvetica Neue', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    fill: #A6DF00;
                    font-size: 112px;
                    letter-spacing: -2px;
                  }

                  .text-supplements {
                    font-family: 'Arial', 'Helvetica Neue', sans-serif;
                    font-weight: bold;
                    fill: #A0A0A0;
                    font-size: 34px;
                    letter-spacing: 11px;
                  }
                `}
              </style>
            </defs>

            <g transform="skewX(-8) translate(40, 0)">
              <text x="70" y="145" className="text-nutra">NUTRA</text>
              <text x="545" y="145" className="text-x">X</text>
            </g>

            <g>
              <text x="155" y="205" className="text-supplements">SUPLEMENTOS</text>
            </g>
          </svg>
        </div>

        <nav className="header__nav">
          <a href="/" className="active">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/contacto">Contacto</a>
        </nav>

        <div className="header__user">
          <div>
            <a href="/carrito" className="header__cart" aria-label="Carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="header__cart-count">3</span>
            </a>
          </div>
          <div>
            <a className="button" href="/login">
              Ingresar

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
          </div>
        </div>

      </div>
      
    </header>
  );
}


export default Header;
