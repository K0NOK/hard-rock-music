const getSongs = async(searchSong) => {
        const url = `https://api.lyrics.ovh/suggest/${searchSong}`;
        toggleSpinner();
        try {
            const response = await fetch(url);
            const data = await response.json();
            displaySongs(data.data);
        } catch (error) {
            const errorSong = document.getElementById('error-song');
            errorSong.innerText = 'Sorry!song not found'
        }
    }
    // Adding click handler for search button
document.getElementById('search-button').addEventListener('click', function() {
    const searchArea = document.getElementById('search-area').value;
    getSongs(searchArea)
})

const displaySongs = (song) => {

    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = '';
    for (i = 0; i < song.length; i++) {
        const songs = song[i];
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${songs.title}</h3>
            <p class="author lead">Album by <span>${songs.artist.name}</span></p>
        </div>
        <audio controls>
            <source src="${songs.preview}" type="audio/mpeg">
        </audio>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${songs.artist.name}','${songs.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        resultArea.appendChild(songDiv);
        toggleSpinner();
    }
}
const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        const errorLyrics = document.getElementById('error-lyrics');
        errorLyrics.innerText = 'Sorry! Something went wrong';
    }
}
const displayLyrics = lyrics => {
        const getLyric = document.getElementById('get-lyrics');
        getLyric.innerText = lyrics;
    }
    // setting uo spinner toggle
const toggleSpinner = () => {
        const spinner = document.getElementById('loading-spinner');
        const songs = document.getElementById('result-area');
        spinner.classList.toggle('d-none');
        songs.classList.toggle('d-none');
    }
    // Enter key setting
const searchBtn = document.getElementById('search-button');
const searchField = document.getElementById('search-area');
searchField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
})