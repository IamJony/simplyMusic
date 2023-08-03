const userListElement = document.getElementById('app');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// FUNCION PARA BUSCAR POR CATEGORIAS SONG, PLAYLIST, ALBUMS
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

// FUNCION PARA BUSCAR POR CANCIONES EN LA API POR DEFAULT &FILTER=MUSIC_SONG 
function searchAPI() {

var th1 = document.getElementById("th1")
var th2 = document.getElementById("th2")
th1.innerHTML = "Nombre"	
th2.innerHTML = "Autor"	
	var elemento = document.getElementById("th3");
elemento.innerHTML = "Duracion";
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_songs`;

// FUNCION PARA CONVERTIR SEGUNDOS A MINUTOS EL FORMATO SERA MM:SS
function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60); // Obtener la cantidad de minutos enteros
  var remainingSeconds = seconds % 60; // Obtener los segundos restantes

  // Formatear el resultado en el formato MM:SS
  var formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
  
  return formattedTime;
} 

// CONSUMIR API CON FETCH y comprobar cual esta en estado 202 ok

function checkApiStatus(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        // La respuesta de la API es exitosa (código de estado 2xx)
        console.log('API kavin.rocks (Official) request successful');
        console.log('Status code:', response.status);
        apiPlaySong = apiUrl;
        searchSong(apiUrl);
      } else {
        fetch(`https://pipedapi.syncpundit.io/search?q=${searchTerm}&filter=music_songs`)
          .then(response => {
            if (response.ok) {
              console.log('API syncpundit.io request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.syncpundit.io/search?q=${searchTerm}&filter=music_songs`;
              searchSong(apiUrl);
            } else {
              console.log('API syncpundit.io requests failed');
              fetch(`https://pipedapi.tokhmi.xyz/search?q=${searchTerm}&filter=music_songs`)
                .then(response => {
                  if (response.ok) {
                    console.log('API pipedapi.tokhmi.xyz request successful');
                    console.log('Status code:', response.status);
                    apiPlaySong = `https://pipedapi.tokhmi.xyz/search?q=${searchTerm}&filter=music_songs`;
                    searchSong(apiUrl);
                  } else {
                    console.log('API pipedapi.tokhmi.xyz requests failed');
                  }
                })
                .catch(error => {
                  console.log('Error:', error);
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    })
    .catch(error => {
      console.log('API request failed');
      console.log('Status code:', response.status);
      console.log('Error:', error);
    });
}

checkApiStatus(apiUrl);

function searchSong(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
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
    });
}

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
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_albums`;

function checkApiStatus(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        // La respuesta de la API es exitosa (código de estado 2xx)
        console.log('API kavin.rocks (Official) request successful');
        console.log('Status code:', response.status);
        apiPlaySong = apiUrl;
        searchAlbums2(apiUrl)
      } else {
        fetch(`https://pipedapi.syncpundit.io/search?q=${searchTerm}&filter=music_albums`)
          .then(response => {
            if (response.ok) {
              console.log('API syncpundit.io request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.syncpundit.io/search?q=${searchTerm}&filter=music_albums`;
              searchAlbums2(apiUrl)
            } else {
              console.log('API syncpundit.io requests failed');
              fetch(`https://pipedapi.tokhmi.xyz/search?q=${searchTerm}&filter=music_albums`)
                .then(response => {
                  if (response.ok) {
                    console.log('API pipedapi.tokhmi.xyz request successful');
                    console.log('Status code:', response.status);
                    apiPlaySong = `https://pipedapi.tokhmi.xyz/search?q=${searchTerm}&filter=music_albums`;
                    searchAlbums2(apiUrl)
                  } else {
                    console.log('API pipedapi.tokhmi.xyz requests failed');
                  }
                })
                .catch(error => {
                  console.log('Error:', error);
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    })
    .catch(error => {
      console.log('API request failed');
      console.log('Status code:', response.status);
      console.log('Error:', error);
    });
}
checkApiStatus(apiUrl);
}




function searchAlbums2(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
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
    });
}

// FUNCION PARA BUSCAR EN LA API POR PLAYLIST o albums EN ESTE CASO TOMA EL PARAMETRO videoId PASADO POR LA FUNCION searchAlbum
function searchPlaylist(videoId) {
	var elemento = document.getElementById("th3");
elemento.innerHTML = "Duracion";
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/playlists/${videoId}`;
  
  function checkApiStatus(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        // La respuesta de la API es exitosa (código de estado 2xx)
        console.log('API kavin.rocks (Official) request successful');
        console.log('Status code:', response.status);
        apiPlaySong = apiUrl;
        searchPlayli(apiUrl)
      } else {
        fetch(`https://pipedapi.syncpundit.io/playlists/${videoId}`)
          .then(response => {
            if (response.ok) {
              console.log('API syncpundit.io request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.syncpundit.io/playlists/${videoId}`;
              searchPlayli(apiUrl)
            } else {
              console.log('API syncpundit.io requests failed');
              fetch(`https://pipedapi.tokhmi.xyz/playlists/${videoId}`)
                .then(response => {
                  if (response.ok) {
                    console.log('API pipedapi.tokhmi.xyz request successful');
                    console.log('Status code:', response.status);
                    apiPlaySong = `https://pipedapi.tokhmi.xyz/playlists/${videoId}`;
                    searchPlayli(apiUrl)
                  } else {
                    console.log('API pipedapi.tokhmi.xyz requests failed');
                  }
                })
                .catch(error => {
                  console.log('Error:', error);
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    })
    .catch(error => {
      console.log('API request failed');
      console.log('Status code:', response.status);
      console.log('Error:', error);
    });
}
checkApiStatus(apiUrl);
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
      // Ocultar pantalla de carga en caso de error
    
    });
}

// FUNCION PARA BUSCAR POR PLAYLIST EN LA API
function searchPlaylist2() {
let elemento = document.getElementById("th3");
elemento.innerHTML = "Contenido"; 
  const searchTerm = searchInput.value;
  let apiUrl = `https://pipedapi.kavin.rocks/search?q=${searchTerm}&filter=music_playlists`;

function checkApiStatus(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        // La respuesta de la API es exitosa (código de estado 2xx)
        console.log('API kavin.rocks (Official) request successful');
        console.log('Status code:', response.status);
        apiPlaySong = apiUrl;
        searchPlayli2(apiUrl)
      } else {
        fetch(`https://pipedapi.syncpundit.io/playlists/${videoId}`)
          .then(response => {
            if (response.ok) {
              console.log('API syncpundit.io request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.syncpundit.io/playlists/${videoId}`;
              searchPlayli2(apiUrl)
            } else {
              console.log('API syncpundit.io requests failed');
              fetch(`https://pipedapi.tokhmi.xyz/playlists/${videoId}`)
                .then(response => {
                  if (response.ok) {
                    console.log('API pipedapi.tokhmi.xyz request successful');
                    console.log('Status code:', response.status);
                    apiPlaySong = `https://pipedapi.tokhmi.xyz/playlists/${videoId}`;
                    searchPlayli2(apiUrl)
                  } else {
                    console.log('API pipedapi.tokhmi.xyz requests failed');
                  }
                })
                .catch(error => {
                  console.log('Error:', error);
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    })
    .catch(error => {
      console.log('API request failed');
      console.log('Status code:', response.status);
      console.log('Error:', error);
    });
}
checkApiStatus(apiUrl);
}

function searchPlayli2(apiUrl) {  
var th1 = document.getElementById("th1")
var th2 = document.getElementById("th2")
th1.innerHTML = "Nombre"	
th2.innerHTML = "Autor"	

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const tableRows = data.items.map(item => {
        const urlParts = item.url.split('=');
        const videoId = urlParts[urlParts.length - 1];
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
      // Ocultar pantalla de carga en caso de error
      
    });
}

// FUNCION PARA REPRODUCIR LA MUSICA

function playAudio(videoId) {
  let apiUrl = `https://pipedapi.kavin.rocks/streams/${videoId}`;
  let apiPlaySong;

  function play(apiPlaySong) {
    fetch(apiPlaySong)
      .then(response => response.json())
      .then(data => {
        const audioStream = data.audioStreams[0].url;
        const thumbnailUrl = data.thumbnailUrl;

        console.log(audioStream);
        console.log(thumbnailUrl);
       var cover = document.getElementById("cover")
       cover.src = thumbnailUrl
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
      });
  }


  function checkApiStatus(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        // La respuesta de la API es exitosa (código de estado 2xx)
        console.log('API kavin.rocks (Official) request successful');
        console.log('Status code:', response.status);
        apiPlaySong = apiUrl;
        play(apiPlaySong);
      } else {
        fetch(`https://pipedapi.syncpundit.io/streams/${videoId}`)
          .then(response => {
            if (response.ok) {
              console.log('API syncpundit.io request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.syncpundit.io/streams/${videoId}`;
              play(apiPlaySong);
            } else {
              console.log('API syncpundit.io requests failed');
              fetch(`https://pipedapi.tokhmi.xyz/${videoId}`)
          .then(response => {
            if (response.ok) {
              console.log('API pipedapi.tokhmi.xyz request successful');
              console.log('Status code:', response.status);
              apiPlaySong = `https://pipedapi.tokhmi.xyz/streams/${videoId}`;
              play(apiPlaySong);
            } else {
              console.log('API pipedapi.tokhmi.xyz requests failed');
              
            }
          })
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }
    })
    .catch(error => {
      console.log('API request failed');
      console.log('Status code:', response.status);
      console.log('Error:', error);
    });
}

  checkApiStatus(apiUrl);
}



// EVENTOS DE ESCUCHA CLICK Y ENTER PARA LA BUSQUEDA    
searchButton.addEventListener('click', busqueda);
searchInput.addEventListener('keydown', handleSearch);
