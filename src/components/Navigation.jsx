import React from "react";
import { Home, Plus, Shapes } from "lucide-react";
// No import needed - using CDN

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">My Notes App</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="/">
                                <Home size={20} />
                                <span>All notes</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="/add-note">
                                <Plus size={20} />
                                <span>Add notes</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="/category">
                                <Shapes size={20} />
                                <span>Categories</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
