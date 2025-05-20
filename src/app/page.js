'use client';

import { useState } from 'react';
import './styles.css';

export default function MesaSelection() {
  const [hoveredTable, setHoveredTable] = useState(null);
  
  // Función para redirigir a las URLs correspondientes
  const navigateToGame = (mesaType) => {
    let url;
    
    switch(mesaType) {
      case 'VIP':
        url = 'https://juego-memoria-cliente-ug3h.onrender.com';
        break;
      case 'ROYAL':
        url = 'https://juego-memoria-cliente1.onrender.com';
        break;
      case 'GOLD':
        url = 'https://juego-memoria-cliente2.onrender.com';
        break;
      default:
        url = '/';
    }
    
    window.location.href = url;
  };

  const mesas = [
    { id: 1, nombre: "MESA VIP", tipo: "VIP", valor: "15.000", colorClass: "mesa-vip" },
    { id: 2, nombre: "MESA ROYAL", tipo: "ROYAL", valor: "20.000", colorClass: "mesa-royal" },
    { id: 3, nombre: "MESA GOLD", tipo: "GOLD", valor: "30.000", colorClass: "mesa-gold" }
  ];

  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1 className="title">FTAPPGAME</h1>
          <p className="subtitle">Selecciona una mesa para comenzar</p>
          <div className="premio-info">
            <span className="sparkles">✨</span>
            <span className="premio-text">¡Grandes premios te esperan!</span>
          </div>
        </div>

        {/* Table selection grid */}
        <div className="mesa-grid">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className={`mesa-card ${mesa.colorClass} ${hoveredTable === mesa.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredTable(mesa.id)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => navigateToGame(mesa.tipo)}
            >
              <div className="mesa-content">
                <div>
                  <h2 className="mesa-nombre">{mesa.nombre}</h2>
                  <div className="jugadores-info">
                    <span className="jugadores-icon">👥</span>
                    <span>Jugadores online: 10</span>
                  </div>
                </div>
                
                <div className="mesa-footer">
                  <div className="ganas-label">GANAS</div>
                  <div className="valor">${mesa.valor}</div>
                  <div className="action-row">
                    <span></span>
                    <div className="entrar-button">
                      ENTRAR <span className="chevron">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer note */}
        <div className="footer">
          <p>Debes iniciar sesión para jugar. Juego para mayores de 18 años.</p>
        </div>
      </div>
    </div>
  );
}
