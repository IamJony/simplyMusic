const userListElement = document.getElementById('app');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');


function busqueda() {
	 const searchFilters = document.getElementById('searchFilters');
	const selectedOption = searchFilters.value;


	switch (selectedOption) {
    case 'song':
      searchAPI()
      break;
    case 'albums':
	searchAlbums()
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


function searchAPI() {
	var elemento = document.getElementById("th3");
elemento.innerHTML = "Duracion";
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_songs`;

function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60); // Obtener la cantidad de minutos enteros
  var remainingSeconds = seconds % 60; // Obtener los segundos restantes

  // Formatear el resultado en el formato MM:SS
  var formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
  
  return formattedTime;
} 
 
  // Mostrar pantalla de carga
  

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
        return `
          <tr>
            <td>${item.title}</td>
            <td>${item.uploaderName}</td>
            <td>${convertSecondsToMinutes(item.duration)}</td>
            <td><button class="play-button" onclick="playAudio('${videoId}')"><i class="fas fa-play"></i></button></td>
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;

    
      
    })
    .catch(error => {
      console.log('Error:', error);
      // Ocultar pantalla de carga en caso de error
      ocultarPantallaCarga();
    });
}



function handleSearch(event) {
  if (event.key === 'Enter') {
    busqueda();
  }
}


function searchAlbums() {
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_albums`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.uploaderName}</td>
			<td><button class="go" onclick="searchPlaylist('${videoId}')">Ver</button></td>
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;

    
      
    })
    .catch(error => {
      console.log('Error:', error);
      // Ocultar pantalla de carga en caso de error
      ocultarPantallaCarga();
    });
}


function searchPlaylist(videoId) {
	var elemento = document.getElementById("th3");
elemento.innerHTML = "Duracion";
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/playlists/${videoId}`;

function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60); // Obtener la cantidad de minutos enteros
  var remainingSeconds = seconds % 60; // Obtener los segundos restantes

  // Formatear el resultado en el formato MM:SS
  var formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
  
  return formattedTime;
} 
 
  // Mostrar pantalla de carga
  

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.relatedStreams.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
        return `
          <tr>
            <td>${item.title}</td>
            <td>${item.uploaderName}</td>
            <td>${convertSecondsToMinutes(item.duration)}</td>
            <td><button class="play-button" onclick="playAudio('${videoId}')"><i class="fas fa-play"></i></button></td>
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;

    
      
    })
    .catch(error => {
      console.log('Error:', error);
      // Ocultar pantalla de carga en caso de error
    
    });
}


function searchPlaylist2() {
var elemento = document.getElementById("th3");
elemento.innerHTML = "Contenido"; 
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_playlists`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.uploaderName}</td>
            <td>${item.videos}</td>
			<td><button class="go" onclick="searchPlaylist('${videoId}')">Ver</button></td>
          </tr>
        `;
      }).join('');
      userListElement.innerHTML = tableRows;

    
      
    })
    .catch(error => {
      console.log('Error:', error);
      // Ocultar pantalla de carga en caso de error
      ocultarPantallaCarga();
    });
}

function playAudio(videoId) {
  // Lógica para reproducir el audio a partir del videoId
  const apiPlaySong = `https://pipedapi.kavin.rocks/streams/${videoId}`;
  console.log('Reproducir audio del videoId:', videoId);
  console.log(apiPlaySong);

  fetch(apiPlaySong)
    .then(response => response.json())
    .then(data => {
      const audioStream = data.audioStreams[0].url;
      const thumbnailUrl = data.thumbnailUrl
      console.log(audioStream);
      console.log(thumbnailUrl);
     
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

audio.addEventListener("timeupdate", function() {
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
    });
}


    
searchButton.addEventListener('click', busqueda);
searchInput.addEventListener('keydown', handleSearch);

