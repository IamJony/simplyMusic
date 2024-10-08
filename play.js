const userListElement = document.getElementById('app');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
let serverUrl = 'https://pipedapi.kavin.rocks' 


// FUNCION PARA BUSCAR POR CATEGORIAS SONG, PLAYLIST, ALBUMS
function busqueda() {
  const searchFilters = document.getElementById('searchFilters');
  const selectedOption = searchFilters.value;

  switch (selectedOption) {
    case 'song':
      searchAPI();
      break;
    case 'albums':
      searchAlbums();
      break;
    case 'playlist':
      searchPlaylist2();
      break;
    default:
      // Opción por defecto si no se selecciona nada
      url = 'https://ejemplo.com/buscar';
      break;
  }
}

const servidores = {
  kavin: 'https://pipedapi.kavin.rocks',
  kavinRockLibre: 'https://pipedapi-libre.kavin.rocks', 
  garudalinux: 'https://piped-api.garudalinux.org', 
  tokhmi: 'https://pipedapi.tokhmi.xyz',
  syncpundit: 'https://pipedapi.syncpundit.io',
mha: 'https://api-piped.mha.fi', 
adminforge: 'https://pipedapi.adminforge.de', 
pluto: 'https://api.watch.pluto.lat', 
yt: 'https://api.piped.yt', 
frontendfriendly: 'https://pipedapi.frontendfriendly.xyz', 
colinslegacy: 'https://pipedapi.colinslegacy.com', 
coldforge: 'https://pipedapi.coldforge.xyz',
darkness: 'https://pipedapi.darkness.services',
schaun: 'https://schaunapi.ehwurscht.at',
codespace: 'https://piped-api.codespace.cz',
drgn: 'https://pipedapi.drgns.space',
ggtyler: 'https://piapi.ggtyler.dev',
reallyawesome: 'https://pipedapi.reallyaweso.me',
privacyredirect: 'https://invidious.privacyredirect.com',
};

const serverFilters = document.getElementById('serverFilters');
serverFilters.addEventListener('change', function () {
  const selectedServer = serverFilters.value;
  serverUrl = servidores[selectedServer]; // Actualizar serverUrl global

  if (!serverUrl) {
    // Manejo para la opción "server" u otras opciones no reconocidas
    console.log('Opción de servidor no válida.');
  }
});

// FUNCION PARA BUSCAR POR CANCIONES EN LA API POR DEFAULT &FILTER=MUSIC_SONG 

let videoIds = [];
let Id 
let positionId;

let intentos = 0

function searchAPI() {
  const th1 = document.getElementById("th1");
  const th2 = document.getElementById("th2");
  th1.innerHTML = "Nombre";
  th2.innerHTML = "Autor";
  const elemento = document.getElementById("th3");
  elemento.innerHTML = "Duración";
  const searchTerm = searchInput.value;
  
 const apiUrl = `${serverUrl}/search?q=${searchTerm}&filter=music_songs`;
  // FUNCION PARA CONVERTIR SEGUNDOS A MINUTOS EL FORMATO SERA MM:SS
  function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60); // Obtener la cantidad de minutos enteros
    const remainingSeconds = seconds % 60; // Obtener los segundos restantes

    // Formatear el resultado en el formato MM:SS
    const formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');

    return formattedTime;
  }



  function searchSong(apiUrl) {
    fetch(apiUrl)
      .then(response => response.json())
      
      .then(data => {
		  
		      if (data.items.length === 0) {
                console.log('Los datos indican que la solicitud fue exitosa pero no hay datos esperados. Intentando de nuevo...');
}
		  
        const tableRows = data.items.map(item => {
          const urlParts = item.url.split('=');
          const videoId = urlParts[urlParts.length - 1];
           videoIds.push(videoId);
          return `
            <tr class="trList" onmouseover="this.style.backgroundColor='#f0f0f0';" onmouseout="this.style.backgroundColor='#ffffff';" onclick="playAudio('${videoId}'); document.getElementById('nameSong').innerHTML = '${item.title}'; document.getElementById('artistSong').innerHTML = '${item.uploaderName}'">
              <td>${item.title}</td>
              <td>${item.uploaderName}</td>
              <td>${convertSecondsToMinutes(item.duration)}</td>
            </tr>
          `;
        }).join('');
        userListElement.innerHTML = tableRows;
      })
      .catch(error => {
        console.log('Error:', error);
        alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
      });
  }

  searchSong(apiUrl); // Llama a la función searchSong para actualizar la tabla
}

// FUNCION PARA AGREGAR EVENTO DE ESCUCHA EN CASO DE PRESIONAR LA TECLA ENTER BUSCARA
function handleSearch(event) {
  if (event.key === 'Enter') {
    busqueda();
  }
}

// FUNCION PARA BUSCAR POR ALBUNES EN LA API &FILTER=MUSIC_ALBUMS
function searchAlbums() {
  const searchTerm = searchInput.value;
  const apiUrl = `${serverUrl}/search?q=${searchTerm}&filter=music_albums`;

  function searchAlbums2(apiUrl) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const tableRows = data.items.map(item => {
          const urlParts = item.url.split('=');
          const videoId = urlParts[urlParts.length - 1];
           videoIds.push(videoId);
          return `
            <tr class="trList" onmouseover="this.style.backgroundColor='#f0f0f0';" onmouseout="this.style.backgroundColor='#ffffff';" onclick="searchPlaylist('${videoId}')">
              <td>${item.name}</td>
              <td>${item.uploaderName}</td>
            </tr>
          `;
        }).join('');
        userListElement.innerHTML = tableRows;
      })
      .catch(error => {
        console.log('Error:', error);
        alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
      });
  }

  searchAlbums2(apiUrl); // Llama a la función searchAlbums2 para actualizar la tabla
}





function searchAlbums2(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
         videoIds.push(videoId);
        return `
          <tr class="trList" onmouseover="this.style.backgroundColor='#f0f0f0';" onmouseout="this.style.backgroundColor='#ffffff';" onclick="searchPlaylist('${videoId}')">
            <td>${item.name}</td>
            <td>${item.uploaderName}</td>			
			</tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;
    })
    .catch(error => {
      console.log('Error:', error);
      alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
    });
}

// FUNCION PARA BUSCAR EN LA API POR PLAYLIST o albums EN ESTE CASO TOMA EL PARAMETRO videoId PASADO POR LA FUNCION searchAlbum
function searchPlaylist(videoId) {
	var elemento = document.getElementById("th3");
elemento.innerHTML = "Duracion";
  const searchTerm = searchInput.value;
  let apiUrl = `${serverUrl}/playlists/${videoId}`;

        searchPlayli(apiUrl)
     }

function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60); // Obtener la cantidad de minutos enteros
  var remainingSeconds = seconds % 60; // Obtener los segundos restantes

  // Formatear el resultado en el formato MM:SS
  var formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
  
  return formattedTime;
} 
 
  // Mostrar pantalla de carga
  
function searchPlayli(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.relatedStreams.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
         videoIds.push(videoId);
        return `
       
       
          <tr class="trList" onmouseover="this.style.backgroundColor='#f0f0f0';" onmouseout="this.style.backgroundColor='#ffffff';" onclick="playAudio('${videoId}'); document.getElementById('nameSong').innerHTML = '${item.title}'">
            <td>${item.title}</td>
            <td>${item.uploaderName}</td>
            <td>${convertSecondsToMinutes(item.duration)}</td>
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;

    
      
    })
    .catch(error => {
      console.log('Error:', error);
      alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
      // Ocultar pantalla de carga en caso de error
    
    });
}

// FUNCION PARA BUSCAR POR PLAYLIST EN LA API
function searchPlaylist2() {
  let elemento = document.getElementById("th3");
  elemento.innerHTML = "Contenido"; 
  const searchTerm = searchInput.value;
  let apiUrl = `${serverUrl}/search?q=${searchTerm}&filter=music_playlists`;
  searchPlayli2(apiUrl);
}

// Definir la función searchPlayli2 por fuera de searchPlaylist2
function searchPlayli2(apiUrl) {  
  var th1 = document.getElementById("th1");
  var th2 = document.getElementById("th2");
  th1.innerHTML = "Nombre";
  th2.innerHTML = "Autor";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
         videoIds.push(videoId);
        return `
          <tr class="trList" onclick="searchPlaylist('${videoId}')" onmouseover="this.style.backgroundColor='#f0f0f0';" onmouseout="this.style.backgroundColor='#ffffff';">
            <td>${item.name}</td>
            <td>${item.uploaderName}</td>
            <td>${item.videos}</td>			
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;
    })
    .catch(error => {
      console.log('Error:', error);
      alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
      // Ocultar pantalla de carga en caso de error
    });
}




// FUNCION PARA REPRODUCIR LA MUSICA





function playAudio(videoId) {
  let apiUrl = `${serverUrl}/streams/${videoId}`;
 Id = videoId
 
 
 
  function play(apiUrl) {
    fetch(apiUrl)
    
      .then(response => response.json())
      .then(data => {

       

		  
		let positionIdd = videoIds.indexOf(Id);
    positionId = positionIdd;
    
        const audioStream = data.audioStreams[0].url;
        const thumbnailUrl = data.thumbnailUrl;
        const name = data.title
        const artist = data.uploader
        
document.getElementById('nameSong').innerHTML =  name
document.getElementById('artistSong').innerHTML = artist
        
        console.log(audioStream);
        
        console.log(thumbnailUrl);
        console.log(videoId);
        var cover = document.getElementById("cover");
        cover.src = thumbnailUrl;

        

        // Lógica adicional para reproducir el audio utilizando los datos de audioStream

        var audio = document.getElementById("myAudio");

        audio.src = audioStream;
        audio.play();

        var playBtn = document.getElementById("playBtn");
        var pauseBtn = document.getElementById("pauseBtn");
        var progressBar = document.getElementById("progressBar");
        var progress = document.getElementById("progress");
        var progressCircle = document.getElementById("progressCircle");
        var buffer = document.getElementById("buffer");
        var currentTimeSpan = document.getElementById("currentTime");
        var totalTimeSpan = document.getElementById("totalTime");

        playBtn.addEventListener("click", playAudio);
        pauseBtn.addEventListener("click", pauseAudio);
        progressBar.addEventListener("click", seekAudio);
        audio.addEventListener("timeupdate", updateProgressBar);
        audio.addEventListener("progress", updateBuffer);
        
        
        audio.addEventListener('ended', playNextVideo);

        audio.addEventListener("timeupdate", function () {
          var currentTime = formatTime(audio.currentTime);
          var totalTime = audio.duration ? formatTime(audio.duration) : "00:00";

          currentTimeSpan.textContent = currentTime;
          totalTimeSpan.textContent = totalTime;
        });

        function formatTime(time) {
          var minutes = Math.floor(time / 60);
          var seconds = Math.floor(time % 60);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          return minutes + ":" + seconds;
        }

        function playAudio() {
          audio.play();
          playBtn.style.display = "none";
          pauseBtn.style.display = "block";
        }

        function pauseAudio() {
          audio.pause();
          pauseBtn.style.display = "none";
          playBtn.style.display = "block";
        }

        function updateProgressBar() {
          var progressValue = (audio.currentTime / audio.duration) * 100;
          progress.style.width = progressValue + "%";
          progressCircle.style.right = 100 - progressValue + "%";
        }

        function updateBuffer() {
          if (audio.buffered.length > 0) {
            var bufferValue = (audio.buffered.end(0) / audio.duration) * 100;
            buffer.style.width = bufferValue + "%";
          }
        }

        function seekAudio(event) {
          var progressBarWidth = progressBar.clientWidth;
          var clickX = event.offsetX;
          var seekTime = (clickX / progressBarWidth) * audio.duration;
          audio.currentTime = seekTime;
        }
      })
      .catch(error => {
        console.log('Error al reproducir audio:', error);
        alert('La solicitud falló :(. Por favor, intenta con otro servidor.');
     
        
      });
  }

  play(apiUrl);
}

     
     // Función para reproducir el siguiente video

function playNextVideo() {
    // Incrementar el índice para obtener el siguiente video
    positionId++;
    console.log(positionId)

    // Verificar si el índice está dentro de los límites del array
    if (positionId < videoIds.length) {
        const nextVideoId = videoIds[positionId]; // Obtener el videoId del siguiente video
        playAudio(nextVideoId); // Reproducir el siguiente video
    } else {
        console.log("No hay más videos para reproducir.");
    }
}
     


// EVENTOS DE ESCUCHA CLICK Y ENTER PARA LA BUSQUEDA    
searchButton.addEventListener('click', busqueda);
searchInput.addEventListener('keydown', handleSearch);
