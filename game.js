
class Game{

	// En el constructor asociamos el canvas del hmtl a la imagen del circuito e inicializamos variables
	constructor(width=500, height=300){
		
		// 1º Declaración de todos los atributos (this)
			// Sprites (todos los datos)
			this.spritecar = {
				top: {x:0, y:0, w:57, h:75},
				top_right: {x:57, y:0, w:77, h:75},
				right: {x:134, y:0, w:65, h:75},
				down_right: {x:199, y:0, w:71, h:75},
				down: {x:270, y:0, w:64, h:75},
				down_left: {x:334, y:0, w:80, h:75},
				left: {x:414, y:0, w:65, h:75},
				top_left: {x:479, y:0, w:72, h:75} 
			};
			// Dónde empieza el coche en el mapa
			this.posicion_inicial={x:-1500, y:-1600};
			

			// configuración del juego: dirección, vueltas, velocidad, tiempo de comienzo
			this.config = {
				direction: 'top',
				total_vueltas: 3,
				vueltas: -1,
				velocidad: 5,
				time_start: Date.now(),
				time_total: 0,
				end_game: false
			};

		// 2º Declaración de canvas y Context en atributos (this)
			// Cambiamos tamaño al que indique en el constructor

			this.canvas = document.getElementById("Micromachine");
			this.ctx = this.canvas.getContext("2d");

		// 3º Cargamos circuito fondo a 'atributo (this)'
			this.img_circuito = new Image();
			this.img_circuito.src = "./img/circuitotornillos.png";
			

		// 3ºA. Cargar circuito fondo en canvas hidden
			this.canvas_hidden = document.getElementById("MicromachineHidden");
			this.ctx_hidden = this.canvas_hidden.getContext("2d");
			this.img_hidden = new Image();
			this.img_hidden.src = "./img/map_circuitotornillos.png";
			this.img_hidden.crossOrigin = "Anonymous";
			this.ctx_hidden.drawImage(
				this.img_hidden,
				this.posicion_inicial.x,
				this.posicion_inicial.y
			);

			

		// 4º Cargamos coche a 'atributo (this)'
			this.img_car = new Image();
			this.img_car.src = "./img/azul.png";


		// 5º y 6º
		this.loading();

		
}

	loading(){
		this.ctx.font = "30px Arial";
		setTimeout(()=>{ this.ctx.fillText("Loading .", 300, 300); }, 100);
		setTimeout(()=>{ this.ctx.fillText("Loading ..", 300, 300); }, 500);
		setTimeout(()=>{ this.ctx.fillText("Loading ...", 300, 300); }, 1000);
		setTimeout(()=>{
			this.ctx.fillText("Loading ...", 300, 300);

			setInterval(()=>{
				this.render();
			}, 50);

		}, 1500);

	}

	render(x=0, y=0){

		this.next_step();

		this.pinta_fondo(x,y);
		this.pinta_coche();
		this.pinta_fondo_hidden();
	}

	next_step(){

		// 1º Controlamos la velocidad
			// NO HACER por ahora
			this.getpixel();

		// 2º Movemos "el coche"
		
		if(this.config.direction=="top"){
			this.posicion_inicial.y += this.config.velocidad;
		}
		if(this.config.direction=="down"){
			this.posicion_inicial.y -= this.config.velocidad;
		}
		if(this.config.direction == "left"){
			this.posicion_inicial.x += this.config.velocidad;
		}
		if(this.config.direction == "right"){
			this.posicion_inicial.x -= this.config.velocidad;
		}
		if(this.config.direction == "top_right"){
			this.posicion_inicial.x -= this.config.velocidad;
			this.posicion_inicial.y += this.config.velocidad;
		}
		if(this.config.direction == "top_left"){
			this.posicion_inicial.x += this.config.velocidad;
			this.posicion_inicial.y += this.config.velocidad;
		}
		if(this.config.direction == "down_left"){
			this.posicion_inicial.x += this.config.velocidad;
			this.posicion_inicial.y -= this.config.velocidad;
		}
		if(this.config.direction == "down_right"){
			this.posicion_inicial.x -= this.config.velocidad;
			this.posicion_inicial.y -= this.config.velocidad;
		}
		
//XXX> Hacer resto de posiciones

	}


	pinta_fondo(){

			this.ctx.drawImage(
				this.img_circuito,
				this.posicion_inicial.x,
				this.posicion_inicial.y
			);

	}

	
	pinta_fondo_hidden(){
		this.ctx_hidden.drawImage(
				this.img_hidden,
				this.posicion_inicial.x,
				this.posicion_inicial.y
			);
		
	}
	

	pinta_coche(){


		// 2. Pintamos el coche
			this.ctx.drawImage(
				this.img_car, 
				this.spritecar[this.config.direction].x,
				this.spritecar[this.config.direction].y,
				this.spritecar[this.config.direction].w,
				this.spritecar[this.config.direction].h,
				360,
				300,
				20,
				20
			);
		
	}

	getpixel(){


		// Recupera el color del pixel
//XXX> Punto en lugar diferente si es "top" o "down"
		if(this.config.direction=="top"){
			this.color_pixel = this.ctx_hidden.getImageData(
				370,
				300,
				1,
				1).data;
		}
		if(this.config.direction=="down"){
			this.color_pixel = this.ctx_hidden.getImageData(
				370,
				320,
				1,
				1).data;
		}
		if(this.config.direction == "left"){
			this.color_pixel = this.ctx_hidden.getImageData(
				360,
				310,
				1,
				1).data;
		}
		if(this.config.direction == "right"){
			this.color_pixel = this.ctx_hidden.getImageData(
				380,
				310,
				1,
				1).data;
		}
		
		//console.log(this.color_pixel);
		/*document.getElementById("test").style.backgroundColor = 'rgba('+
																				this.color_pixel[0] + ','+
																				this.color_pixel[1] + ','+
																				this.color_pixel[2] + ','+
																				this.color_pixel[3] + ')';
		*/
		//console.log(this.color_pixel);
//XXX> MODIFICA LA VELOCIDAD DEPENDIENDO DEL COLOR
		
		if(this.color_pixel == '237,28,36,255'){
			this.config.velocidad = 5;
		}
		if(this.color_pixel == '0,0,0,255'){
			this.config.velocidad = 10;
		}
		if(this.color_pixel == '255,255,255,255'){
			this.config.velocidad = 2;
		}
		if(this.color_pixel == '63,72,204,255'){
			this.config.velocidad = 0;
		}
		if(this.color_pixel == '63,210,0,255'){
			this.vueltas();
			
			
		}
	

	}

	vueltas(){

		if(!this.config.end_game){
			this.time_total = Date.now() - this.config.time_start;
			this.config.vueltas += 1;
			
			if(this.config.vueltas > 0){
				// Se cambia el valor del texto del SPAN vueltas
				document.getElementById("vueltas").textContent = ''+ this.config.vueltas +'';

				// Se cambia el valor de los segundos en el SPAN segundos
				document.getElementById("segundos").textContent = ''+ this.time_total/1000 +'';
			}

		}

		if(this.config.total_vueltas == (this.config.vueltas)){
			//console.log("entro en el fin del juego");
			this.fin_juego();
		}
		
		
		return this.config.vueltas;
	}

	fin_juego(){

		this.config.velocidad = 0;
		this.config.end_game = true;

		/*
		this.ctx.font = "30px Arial";
		this.ctx.fillText("Juego terminado", 300, 300); 
		this.ctx.fillText("Has dado 3 vueltas en " + this.time_total/1000 , 300, 400);
		this.ctx.fill();
		*/
	}

}

class Input{
	constructor(){

		this.keys = {
			ArrowRight:false,
			ArrowLeft:false,
			ArrowUp:false,
			ArrowDown: false
		};

		document.addEventListener("keydown", event => {
			this.keydown(event.code);
			this.keydirection();
		});

		document.addEventListener("keyup", event => {
			this.keyup(event.code);
			this.keydirection();
		});
		
	}

	keydown(key){

		if(this.keys.hasOwnProperty(key) == true){
			// console.log("Tecla pulsada ",key);
			this.keys[key] = true;
		}

	}
	
	keyup(key){

		if(this.keys.hasOwnProperty(key) == true){
			// console.log("Tecla levantada ", key);
			this.keys[key] = false;
		}

	}
	

	keydirection(){

		if(this.keys.ArrowUp){
			game.config.direction = "top";
		}

		if(this.keys.ArrowLeft){
			game.config.direction = "left";
		}

		if(this.keys.ArrowRight){
			game.config.direction = "right";
		}

		if(this.keys.ArrowDown){
			game.config.direction = "down";
		}

		if(this.keys.ArrowUp && this.keys.ArrowLeft){
			game.config.direction = "top_left";
		}

		if(this.keys.ArrowUp && this.keys.ArrowRight){
			game.config.direction = "top_right";			
		}
		if(this.keys.ArrowDown && this.keys.ArrowRight){
			game.config.direction = "down_right";			
		}

		if(this.keys.ArrowDown && this.keys.ArrowLeft){
			game.config.direction = "down_left";
		}

		//console.log("Dirección", game.config.direction);

		return true;
	}


}


window.onload = function(){
	input = new Input();
	game = new Game();

}


