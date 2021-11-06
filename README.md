# Micromachine
Juego de coches
 
# Canvas (HTML) y JavaScript
El juego está realizado en un Canvas de HTML5 y JavaScript.

# Construcción del juego
Se ha creado un archivo HTML5 donde hemos creado principalmente una etiqueta CANVAS donde se va a ejecutar el juego.
En el HTML5 se ha enlazado bootstrap.

En el HTML5 tambien enlaza con el archivo "game.js" donde están las instrucciones del juego.

"Game.js" dispone de dos clases: Game e Input
La clase Input es la que coge la pulsación de la tecla y le indicamos que vamos a hacer con la tecla.
La clase Game es donde está el funcionamiento del juego:
- Movimiento según la tecla que se haya pulsado. 
- Movimiento del fondo y movimiento del coche según las teclas que presiones
- Configuración del juego, render y cambios de velocidad (pegamento: más despacio, aceite: más rápido) o choque según por donde vayas.
