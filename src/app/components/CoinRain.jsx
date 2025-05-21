// components/CoinRain.js
'use client';

import { useEffect, useState } from 'react';
import './CoinRain.css';

export default function CoinRain() {
  const [coins, setCoins] = useState([]);
  
  useEffect(() => {
    // Configuración de densidad moderada (equilibrada)
    const coinCount = window.innerWidth < 768 ? 8 : 12; // Cantidad moderada
    const minDuration = 4; // Caída más lenta para mejor visibilidad
    const maxDuration = 7;
    const intervalTime = 2500; // Intervalo más largo entre lotes
    
    // Crear monedas iniciales
    createCoins();
    
    // Configurar intervalo para crear nuevas monedas
    const interval = setInterval(createCoins, intervalTime);
    
    function createCoins() {
      const newCoins = [];
      
      for (let i = 0; i < coinCount / 4; i++) {
        newCoins.push(createCoin());
      }
      
      setCoins(prevCoins => [...prevCoins, ...newCoins]);
      
      // Limpiar monedas viejas si hay demasiadas
      if (coins.length > 60) {
        setCoins(prevCoins => prevCoins.slice(-40));
      }
    }
    
    function createCoin() {
      const left = Math.random() * 100;
      const size = Math.random() * 0.3 + 0.8; // Tamaño más uniforme
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * 2;
      const rotation = Math.random() * 360;
      
      return {
        id: Date.now() + Math.random(),
        left,
        size,
        duration,
        delay,
        rotation,
        symbol: '💰' // Usar solo monedas doradas
      };
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="coin-rain-container">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="coin"
          style={{
            left: `${coin.left}%`,
            transform: `scale(${coin.size}) rotate(${coin.rotation}deg)`,
            animation: `coinFall ${coin.duration}s linear ${coin.delay}s forwards`
          }}
        >
          {coin.symbol}
        </div>
      ))}
    </div>
  );
}