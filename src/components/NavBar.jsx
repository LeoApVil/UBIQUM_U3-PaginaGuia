import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setOpenMenu(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}
        <NavLink
          className="navbar-brand fw-bold"
          to="/"
          onClick={closeMenus}
        >
          <i className="bi bi-rocket-takeoff me-2"></i>
          React y Firebase
        </NavLink>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* ================= INICIO ================= */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/"
                onClick={closeMenus}
              >
                <i className="bi bi-house me-1"></i>
                Inicio
              </NavLink>
            </li>

            {/* ================= REACT-VITE ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "react-vite" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("react-vite")}
                aria-expanded={openMenu === "react-vite"}
              >
                <i className="bi bi-code-square me-1"></i>
                React-Vite
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "react-vite" ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/React"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-filetype-jsx me-2"></i>
                    React
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/JSX"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-braces me-2"></i>
                    JSX
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/Vite"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-lightning-charge me-2"></i>
                    Vite
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/IniciarProyecto"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-folder-plus me-2"></i>
                    Iniciar proyecto
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/FuncionesBasicas"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-gear me-2"></i>
                    Componentes
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ================= FIREBASE ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "firebase" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("firebase")}
                aria-expanded={openMenu === "firebase"}
              >
                <i className="bi bi-fire me-1"></i>
                Firebase
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "firebase" ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/Firebase"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-fire me-2"></i>
                    Firebase
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/InstalacionCLI"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-terminal me-2"></i>
                    Instalación CLI
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/Hosting"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-cloud-upload me-2"></i>
                    Hosting
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ================= HOOKS ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "hooks" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("hooks")}
                aria-expanded={openMenu === "hooks"}
              >
                <i className="bi bi-code-slash me-1"></i>
                Hooks
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "hooks" ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/ImplementacionRTDB"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-code-square me-2"></i>
                    Hooks
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/EjemploUseState"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-grid me-2"></i>
                    useState
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/EjemploUseEffect"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>
                    useEffect
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/EjemploUseContext"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-diagram-3 me-2"></i>
                    useContext
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ================= REALTIME DATABASE ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "rtdb" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("rtdb")}
                aria-expanded={openMenu === "rtdb"}
              >
                <i className="bi bi-database me-1"></i>
                Realtime Database
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "rtdb" ? "show" : ""
                }`}
              >
                {/* Definiciones / Tutorial */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/RealtimeDatabase"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-book me-2"></i>
                    Realtime Database
                  </NavLink>
                </li>

                {/* Implementación */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/ImplementacionRTDB"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-code-square me-2"></i>
                    Implementación
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Ejemplos */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/VistaEjemplosDatos"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-collection me-2"></i>
                    Demostración
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ================= AUTHENTICATION ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "authentication" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("authentication")}
                aria-expanded={openMenu === "authentication"}
              >
                <i className="bi bi-person-lock me-1"></i>
                Authentication
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "authentication" ? "show" : ""
                }`}
              >
                {/* Definiciones / Tutorial */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/Authentication"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-book me-2"></i>
                    Authentication
                  </NavLink>
                </li>

                {/* Implementación */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/ImplementacionAuth"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-code-square me-2"></i>
                    Implementación
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Ejemplo */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/EjemploAuth"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-person-check me-2"></i>
                    Demostración
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ================= AUTHENTICATION ================= */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle ${
                  openMenu === "cloudinary" ? "show" : ""
                }`}
                type="button"
                onClick={() => toggleMenu("cloudinary")}
                aria-expanded={openMenu === "cloudinary"}
              >
                <i className="bi bi-person-lock me-1"></i>
                Cloudinary
              </button>

              <ul
                className={`dropdown-menu ${
                  openMenu === "cloudinary" ? "show" : ""
                }`}
              >
                {/* Definiciones / Tutorial */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/Cloudinary"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-book me-2"></i>
                    Cloudinary
                  </NavLink>
                </li>

                {/* Implementación */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/ImplementacionCloud"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-code-square me-2"></i>
                    Implementación
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* Demostración */}
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/EjemploCloud"
                    onClick={closeMenus}
                  >
                    <i className="bi bi-person-check me-2"></i>
                    Demostración
                  </NavLink>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;