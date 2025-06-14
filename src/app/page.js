'use client';

import { useState, useRef, useEffect } from 'react';
import './styles.css';
import CoinRain from './components/CoinRain';

export default function MesaSelection() {
  const [hoveredTable, setHoveredTable] = useState(null);
  const [showAudioConsent, setShowAudioConsent] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const handleAudioConsent = (accepted) => {
    setShowAudioConsent(false);
    if (accepted) {
      setIsMuted(false);
      try {
        audioRef.current.play();
      } catch (error) {
        console.error('Error al reproducir audio:', error);
      }
    }
  };

  const handleMesaClick = (mesa) => {
    navigateToGame(mesa.tipo);
  };

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
    { id: 2, nombre: "MESA ROYAL", tipo: "ROYAL", valor: "10.000", colorClass: "mesa-royal" },
    { id: 3, nombre: "MESA GOLD", tipo: "GOLD", valor: "5.000", colorClass: "mesa-gold" }
  ];

  return (
    <div className="container">
      <audio 
        ref={audioRef} 
        loop 
        muted={isMuted}
        src="/cancionfondo.mp3"
      />
      
      {showAudioConsent && (
        <div className="audio-consent-overlay">
          <div className="audio-consent-modal">
            <h3>¡Bienvenido a FTAPPGAME!</h3>
            <p>Para una mejor experiencia, recomendamos activar el sonido.</p>
            <p className="audio-warning">
              ⚠️ Las políticas de tu navegador requieren tu permiso para reproducir audio.
            </p>
            <div className="audio-consent-buttons">
              <button 
                className="consent-button cancel"
                onClick={() => handleAudioConsent(false)}
              >
                Cancelar
              </button>
              <button 
                className="consent-button accept"
                onClick={() => handleAudioConsent(true)}
              >
                Aceptar sonido
              </button>
            </div>
          </div>
        </div>
      )}

      {!showAudioConsent && (
        <button 
          className="mute-button"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}

      <CoinRain />
      
      <div className="overlay"></div>
      <div className="content">
        <div className="header">
          <h1 className="title">FTAPPGAME</h1>
          <p className="subtitle">Selecciona una mesa para comenzar</p>
          <div className="premio-info">
            <span className="sparkles">✨</span>
            <span className="premio-text">¡Grandes premios te esperan!</span>
          </div>
        </div>

        <div className="mesa-grid">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className={`mesa-card ${mesa.colorClass} ${hoveredTable === mesa.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredTable(mesa.id)}
              onMouseLeave={() => setHoveredTable(null)}
              onClick={() => handleMesaClick(mesa)}
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
        
        <div className="footer">
          <p>Debes iniciar sesión para jugar. Juego para mayores de 18 años.</p>
        </div>
      </div>
    </div>
  );
}