Aplicación de Selección de Mesas FTAPPGAME
Este proyecto es una aplicación web desarrollada con Next.js 14 que permite a los usuarios seleccionar entre diferentes mesas de juego, cada una con sus propias características y premios. La aplicación redirige a los usuarios a diferentes juegos según la mesa seleccionada.
Características principales

Selección de mesas: Interfaz atractiva con tres opciones de mesas (VIP, ROYAL y GOLD)
Efecto de lluvia de monedas: Animación visual que mejora la experiencia de usuario
Diseño responsivo: Se adapta perfectamente a diferentes tamaños de pantalla
Optimización de rendimiento: Ajustes automáticos para dispositivos de diferentes capacidades

Componentes principales
MesaSelection
El componente principal que muestra las diferentes opciones de mesas disponibles para los jugadores. Cada mesa tiene:

Un nombre distintivo
Una indicación del valor del premio
Un contador de jugadores en línea
Un diseño único con esquema de colores diferente

El componente gestiona el estado de hover para efectos visuales y la redirección a diferentes URLs de juegos cuando el usuario selecciona una mesa:

MESA VIP: Redirige a https://juego-memoria-cliente-ug3h.onrender.com
MESA ROYAL: Redirige a https://juego-memoria-cliente1.onrender.com
MESA GOLD: Redirige a https://juego-memoria-cliente2.onrender.com

CoinRain
Este componente añade un efecto visual de lluvia de monedas en la pantalla, lo que mejora la experiencia del usuario y refuerza el tema de premios monetarios de la aplicación.
Características de la lluvia de monedas:

Generación dinámica: Las monedas se crean y caen constantemente en la pantalla
Efecto aleatorio: Cada moneda tiene una posición, tamaño, velocidad y rotación únicas
Optimización para rendimiento:

Detección automática de dispositivos de bajo rendimiento
Ajuste de la cantidad y complejidad de las animaciones según las capacidades del dispositivo
Reducción de monedas cuando la pestaña no está activa para ahorrar recursos
Gestión eficiente de memoria al eliminar monedas antiguas



Tecnologías utilizadas

Next.js 14: Framework de React para desarrollo frontend
CSS personalizado: Estilos sin frameworks externos para mantener el control total sobre el diseño
React Hooks: useState y useEffect para gestionar el estado y efectos secundarios
Optimización de rendimiento: Detección de capacidades y ajustes dinámicos para diferentes dispositivos

Cómo funciona

Al cargar la página, se muestra la selección de mesas con una lluvia constante de monedas en el fondo
El usuario puede pasar el cursor sobre las diferentes opciones para ver el efecto de hover
Al hacer clic en una mesa, el sistema redirige al usuario al juego correspondiente
La aplicación optimiza automáticamente la experiencia según las capacidades del dispositivo del usuario

Implementación técnica
El componente de lluvia de monedas utiliza diversas técnicas para mantener un rendimiento óptimo:

Creación por lotes: Las monedas se generan en pequeños lotes periódicos en lugar de todas a la vez
Limpieza automática: Las monedas antiguas se eliminan para mantener controlado el uso de memoria
Detección de hardware: Se ajusta la intensidad visual según las capacidades del dispositivo
Gestión de eventos del ciclo de vida: Limpieza adecuada de listeners y timeouts para evitar fugas de memoria

Despliegue
Esta aplicación está optimizada para ser desplegada en plataformas como Render, que permiten una integración continua con repositorios Git, facilitando las actualizaciones y mantenimiento.
Requisitos del sistema

Node.js 18 o superior
Navegador moderno con soporte para CSS animations y React

Próximas mejoras

Integración con sistema de autenticación para acceso de usuarios
Panel de administración para gestión de mesas y premios
Estadísticas en tiempo real de jugadores activos
Temas visuales personalizables


Este proyecto combina una interfaz atractiva con optimizaciones técnicas cuidadosas para ofrecer una experiencia fluida en todo tipo de dispositivos, desde computadoras de escritorio de alta gama hasta teléfonos móviles más antiguos.