// ── Selección de elementos del DOM ──
const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');
const progreso      = document.getElementById('progreso');
const cancion       = document.getElementById('cancion');
const iconoControl  = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles .boton-reproducir-pausar');
const botonAtras    = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

// ── Array de canciones ──
const canciones = [
    {
        titulo: 'AIR - PLAY',
        nombre: 'Desconocido',
        fuente: 'music/- - -AIR - PLAY-.mp3'
    },
    {
        titulo: 'ANGEL OF THE MORNING',
        nombre: 'Desconocido',
        fuente: 'music/- - ANGEL   DE LA MAÑANA-.mp3'
    },
    {
        titulo: 'BABY I LOVE YOUR WAY',
        nombre: 'Desconocido',
        fuente: 'music/- - BABY I LOVE YOU.mp3'
    },
    {
        titulo: 'Dream',
        nombre: 'Desconocido',
        fuente: 'music/- - DREAM.mp3'
    },
];

// ── Índice de canción actual ──
let indiceCancionActual = 0;

// ── Actualiza la UI con los datos de la canción actual ──
function actualizarInfoCancion() {
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src               = canciones[indiceCancionActual].fuente;
}

// ── Reproducir / Pausar ──
function reproducirPausar() {
    if (cancion.paused) {
        cancion.play();
        iconoControl.classList.replace('bi-play-fill', 'bi-pause-fill');
    } else {
        cancion.pause();
        iconoControl.classList.replace('bi-pause-fill', 'bi-play-fill');
    }
}

// ── Actualiza la barra de progreso mientras suena ──
function actualizarProgreso() {
    const porcentaje = (cancion.currentTime / cancion.duration) * 100;
    progreso.value = porcentaje || 0;
}

// ── Al mover la barra de progreso manualmente ──
function cambiarProgreso() {
    cancion.currentTime = (progreso.value / 100) * cancion.duration;
}

// ── Canción siguiente ──
function siguiente() {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    cancion.play();
    iconoControl.classList.replace('bi-play-fill', 'bi-pause-fill');
}

// ── Canción anterior ──
function anterior() {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    cancion.play();
    iconoControl.classList.replace('bi-play-fill', 'bi-pause-fill');
}

// ── Al terminar la canción, pasa a la siguiente automáticamente ──
cancion.addEventListener('ended', siguiente);

// ── Eventos ──
botonReproducirPausar.addEventListener('click', reproducirPausar);
botonAdelante.addEventListener('click', siguiente);
botonAtras.addEventListener('click', anterior);
cancion.addEventListener('timeupdate', actualizarProgreso);
progreso.addEventListener('input', cambiarProgreso);

// ── Inicializar ──
actualizarInfoCancion();
