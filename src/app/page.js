'use client';

import { useState, useRef, useEffect } from 'react';
import './styles.css';
import CoinRain from './components/CoinRain';

export default function MesaSelection() {
  const [hoveredTable, setHoveredTable] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Efecto para manejar la reproducción automática
  useEffect(() => {
    if (audioRef.current) {
      const playAudio = () => {
        try {
          audioRef.current.play();
          document.removeEventListener('click', playAudio);
        } catch (error) {
          console.log('Error al reproducir audio:', error);
        }
      };
      
      document.addEventListener('click', playAudio);
      return () => document.removeEventListener('click', playAudio);
    }
  }, []);

  const PINS = {
    ROYAL: '3484',
    GOLD: '1528'
  };

  const handleMesaClick = (mesa) => {
    if (mesa.tipo === 'VIP') {
      navigateToGame(mesa.tipo);
    } else {
      setSelectedMesa(mesa);
      setShowPinModal(true);
      setPin('');
      setPinError('');
    }
  };

  const validatePin = () => {
    if (pin.length !== 4) {
      setPinError('El PIN debe tener 4 dígitos');
      return;
    }
    
    if (pin === PINS[selectedMesa.tipo]) {
      setShowPinModal(false);
      navigateToGame(selectedMesa.tipo);
    } else {
      setPinError('PIN incorrecto');
      setPin('');
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
      setPinError('');
    }
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
    { id: 2, nombre: "MESA ROYAL", tipo: "ROYAL", valor: "20.000", colorClass: "mesa-royal" },
    { id: 3, nombre: "MESA GOLD", tipo: "GOLD", valor: "30.000", colorClass: "mesa-gold" }
  ];

  return (
    <div className="container">
      <audio 
        ref={audioRef} 
        loop 
        muted={isMuted}
        src="/cancionfondo.mp3"
      />
      
      <button 
        className="mute-button"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

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
                  {mesa.tipo !== 'VIP' && (
                    <div className="pin-required">
                      <span className="lock-icon">🔒</span>
                      <span>Requiere PIN</span>
                    </div>
                  )}
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
      
      {showPinModal && (
        <div className="pin-modal-overlay" onClick={() => setShowPinModal(false)}>
          <div className="pin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Ingrese el PIN de seguridad</h3>
            <p className="pin-mesa-name">{selectedMesa?.nombre}</p>
            
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="PIN de 4 dígitos"
              className="pin-input"
              maxLength="4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && validatePin()}
            />
            
            {pinError && <p className="pin-error">{pinError}</p>}
            
            <div className="pin-modal-buttons">
              <button 
                className="pin-button cancel"
                onClick={() => setShowPinModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="pin-button confirm"
                onClick={validatePin}
                disabled={pin.length !== 4}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}