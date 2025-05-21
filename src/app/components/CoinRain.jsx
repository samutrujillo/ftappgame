// components/CoinRain.js
'use client';

import { useEffect, useState } from 'react';
import './CoinRain.css';

export default function CoinRain() {
  const [coins, setCoins] = useState([]);
  
  useEffect(() => {
    // Función para determinar si el dispositivo es de bajo rendimiento
    const isLowPerformanceDevice = () => {
      return window.navigator.hardwareConcurrency <= 2 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    // Ajustar configuración según el rendimiento del dispositivo
    const coinCount = isLowPerformanceDevice() ? 10 : (window.innerWidth < 768 ? 15 : 30);
    const minDuration = isLowPerformanceDevice() ? 4 : 3; // segundos
    const maxDuration = isLowPerformanceDevice() ? 7 : 6; // segundos
    const intervalTime = isLowPerformanceDevice() ? 3000 : 2000; // ms
    
    // Crear monedas iniciales
    createCoins();
    
    // Configurar intervalo para crear nuevas monedas
    const interval = setInterval(createCoins, intervalTime);
    
    function createCoins() {
      const newCoins = [];
      
      // Reducir la cantidad de monedas creadas por lote en dispositivos de bajo rendimiento
      const batchSize = isLowPerformanceDevice() ? coinCount / 5 : coinCount / 3;
      
      for (let i = 0; i < batchSize; i++) {
        newCoins.push(createCoin());
      }
      
      setCoins(prevCoins => [...prevCoins, ...newCoins]);
      
      // Limpiar monedas viejas si hay demasiadas
      // Límite más bajo para dispositivos de bajo rendimiento
      const limit = isLowPerformanceDevice() ? 50 : 100;
      const keepCount = isLowPerformanceDevice() ? 25 : 50;
      
      if (coins.length > limit) {
        setCoins(prevCoins => prevCoins.slice(-keepCount));
      }
    }
    
    function createCoin() {
      const left = Math.random() * 100;
      const size = Math.random() * 0.5 + 0.7; // Tamaño entre 0.7 y 1.2
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * 2;
      const rotation = Math.random() * 360;
      // Usar preferentemente la moneda emoji en dispositivos de bajo rendimiento (más liviana)
      const symbol = isLowPerformanceDevice() ? '🪙' : (Math.random() > 0.5 ? '💰' : '🪙');
      
      return {
        id: Date.now() + Math.random(),
        left,
        size,
        duration,
        delay,
        rotation,
        symbol
      };
    }
    
    // Función para reducir monedas cuando la pestaña no está activa
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Si la pestaña no está activa, reducir la cantidad de monedas
        setCoins(prevCoins => prevCoins.slice(-10));
      }
    };
    
    // Agregar listener para la visibilidad de la página
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Función para manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      // Limpiar algunas monedas cuando el usuario cambia el tamaño de la ventana
      // para evitar problemas de rendimiento durante el reflow
      setCoins(prevCoins => prevCoins.slice(-20));
    };
    
    // Agregar listener para el cambio de tamaño con debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 300);
    });
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
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