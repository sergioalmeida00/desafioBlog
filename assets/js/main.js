// INTEGRAÇÃO COM API
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=373abc2ec6f223280db930f5c62aa579&language=pt-BR&";
const API_URL = BASE_URL + "discover/movie?sort_by=popularity.desc&" + API_KEY;
const BASE_IMG = "https://image.tmdb.org/t/p/w500/";
const searchURL = BASE_URL + "search/movie?" + API_KEY + "query=";

const btnTopo = document.querySelector('.topo');
const sectionMovies = document.querySelector('#movies')
const inputSearch = document.querySelector('.search input');
const form = document.querySelector('.search');
const headerTitle = document.querySelector('#header .title');
headerTitle.addEventListener('onclick', getMovies);

// INICIA OS DADOS DA API
getMovies(API_URL);

// FAZ A BUSCA CONFORME A URL DA API
function getMovies(url) {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        showMovies(data.results);

        if (data.results.length == 0) {
            alert("Filme não encontrado");
            getMovies(API_URL);
        }

    });
}
// MONTA HTML EM TELA DOS ITENS ENCONTRADOS
function showMovies(valuesData) {

    for (let data of valuesData) {

        if (data.adult == false && data.overview != '') {
            const newDate = data.release_date.split('-');
            sectionMovies.innerHTML += `
            <article>
            <div class="image">
                <img src="${BASE_IMG}${data.poster_path}" alt="${data.title}">
            </div>
            <div class="info">
                <header>
                    <p>${newDate[2]}-${newDate[1]}-${newDate[0]}</p>
                    <span class="${getColor(data.vote_average)}">${data.vote_average}</span>
                </header>
                <h2>${data.title}</h2>
                <p>${data.overview}</p>
            </div>
        </article>
            `
        }
    }

}

// VERIFICA A CLASSIFIÇÃO DO FILME CONFORME OBTIDA NA API E RETORNAS AS CORES, CONFORME FEITO NO CSS
function getColor(voteValue) {
    if (voteValue >= 8) {
        return 'green';
    } else if (voteValue >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// FICA AGUARDANDO O EVENTO SUBMIT PARA PODER ASSIM REALIZAR A BUSCA CHAMANDO A URL DA API DEVIDA
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTxt = inputSearch.value;
    if (searchTxt.trim() != 0) {
        getMovies(searchURL + searchTxt);
        clearMovies();
    } else {
        getMovies(API_URL);
        clearMovies();
    }
});


function clearMovies() {
    sectionMovies.innerHTML = "";
}

// BTN PARA VOLTAR AO TOPO
function topoScroll() {
    if (window.scrollY >= 100) {
        btnTopo.classList.add('active');
    } else {
        btnTopo.classList.remove('active');
    }
}



window.addEventListener('scroll', topoScroll);