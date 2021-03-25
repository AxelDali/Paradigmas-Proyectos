class Mesa {
    constructor(img_r, ini_r, fin_r, tot_r){
        this.horaInicio;
        this.horaFinal;
        this.total = 0;
        this.img_id = document.getElementById(img_r);   // ID de la imagen
        this.ini_id = document.getElementById(ini_r);   // ID de la hora de inicio
        this.fin_id = document.getElementById(fin_r);   // ID de la hora de final
        this.tot_id = document.getElementById(tot_r);   // ID del total
        this.tiempoInicio;                              // Inicio del timer
        this.tiempoTranscurrido = 0;                    // Tiempo transcurrido desde el inicio
        this.tiempoIntervalo;                           // Intervalo del timer

    }
}

let mesa1 = new Mesa('mesa1_imagen', 'mesa1_inicio', 'mesa1_final', 'mesa1_total')
let mesa2 = new Mesa('mesa2_imagen', 'mesa2_inicio', 'mesa2_final', 'mesa2_total')
let mesa3 = new Mesa('mesa3_imagen', 'mesa3_inicio', 'mesa3_final', 'mesa3_total')
let mesa4 = new Mesa('mesa4_imagen', 'mesa4_inicio', 'mesa4_final', 'mesa4_total')
let mesa5 = new Mesa('mesa5_imagen', 'mesa5_inicio', 'mesa5_final', 'mesa5_total')
let mesa6 = new Mesa('mesa6_imagen', 'mesa6_inicio', 'mesa6_final', 'mesa6_total')

const cambiarMesa = (mesa) => {
    if(mesa.img_id.src.match("Imagenes/tableOff.png")){
        mesa.img_id.src = "Imagenes/tableOn.png";                               // Encender mesa
        mesa.horaInicio = new Date();
        let hora = mesa.horaInicio.toLocaleTimeString(navigator.language, {     // Hora de inicio
            hour: '2-digit',
            minute:'2-digit'});
        mesa.ini_id.innerHTML = hora;
        mesa.fin_id.innerHTML = "En uso";
        mesa.tot_id.innerHTML = '';
        mesa.tiempoTranscurrido = 0;
        mesa.tiempoInicio = mesa.horaInicio - mesa.tiempoTranscurrido;
        mesa.tiempoIntervalo = setInterval(function imprimirTotal() {
            mesa.tiempoTranscurrido = Date.now() - mesa.tiempoInicio;
            mesa.total = Math.ceil(mesa.tiempoTranscurrido/6000) * 50 / 600;    // El total se redondea cada 6 segundos
            let total = `$${mesa.total.toFixed(2)}`;
            mesa.tot_id.innerHTML = total;
        }, 1000);

    }
    else{
        mesa.img_id.src = "Imagenes/tableOff.png"
        mesa.horaFinal = new Date();
        let hora = mesa.horaFinal.toLocaleTimeString(navigator.language, {      // Hora final
            hour: '2-digit',
            minute:'2-digit'});
        mesa.fin_id.innerHTML = hora;
        clearInterval(mesa.tiempoIntervalo);
    }
}