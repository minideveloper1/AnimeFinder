// API URL and constants
const API_BASE_URL = 'https://api.jikan.moe/v4';
const STORAGE_KEY = 'animeSearchFavorites';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const favoritesArea = document.getElementById('favoritesArea');
const tabs = document.querySelectorAll('.tab');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const newFuature = 85 // ...


let favorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let lastSearchResults = [];
let isLoading = false;


document.addEventListener('DOMContentLoaded', () => {
   
    checkTheme();
    
    loadFavorites();
    
    setupEventListeners();
});


function setupEventListeners() {
   
    searchButton.addEventListener('click', performSearch);
    
 
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
  
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    

    themeToggle.addEventListener('click', toggleTheme);
}


function checkTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
}

// Toggle theme
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
}


function switchTab(tabName) {
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    

    if (tabName === 'search') {
        searchResults.style.display = 'block';
        favoritesArea.style.display = 'none';
    } else {
        searchResults.style.display = 'none';
        favoritesArea.style.display = 'block';
        loadFavorites();
    }
}


async function performSearch() {
    const query = searchInput.value.trim();
    

    if (!query) {
        searchResults.innerHTML = `<div class="message">Please enter an anime name!</div>`;
        return;
    }
    

    searchResults.innerHTML = `<div class="loading">Loading</div>`;
    isLoading = true;
    
    try {

        const response = await fetch(`${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true&limit=20`);
        const data = await response.json();
        

        if (response.status === 429) {
            searchResults.innerHTML = `<div class="message">Too many requests. Please wait and try again.</div>`;
            return;
        }
        

        handleSearchResults(data);
    } catch (error) {
        console.error('Search error:', error);
        searchResults.innerHTML = `<div class="message">An error occurred: ${error.message}</div>`;
    } finally {
        isLoading = false;
    }
}


function handleSearchResults(data) {
    const animes = data.data || [];
    lastSearchResults = animes;
    

    if (animes.length === 0) {
        searchResults.innerHTML = `<div class="message">No anime found with that name.</div>`;
        return;
    }
    

    searchResults.innerHTML = `<div class="anime-grid">${renderAnimeCards(animes)}</div>`;
    

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const animeId = parseInt(btn.dataset.id);
            toggleFavorite(animeId);
        });
    });
}


function renderAnimeCards(animes) {
    return animes.map(anime => {
        const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id);
        const favoriteClass = isFavorite ? 'is-favorite' : '';
        const favoriteIcon = isFavorite ? '❤️' : '🤍';
        

        const title = anime.title || 'Unnamed Anime';
        const imageUrl = anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318?text=No+Image';
        const synopsis = anime.synopsis || 'No description available.';
        const score = anime.score || 'N/A';
        

        let year = 'Unknown';
        if (anime.aired?.prop?.from?.year) {
            year = anime.aired.prop.from.year;
        }
        
        return `
            <div class="anime-card ${favoriteClass}">
                <img src="${imageUrl}" alt="${title}" class="anime-poster">
                <button class="favorite-btn" data-id="${anime.mal_id}">${favoriteIcon}</button>
                <div class="anime-info">
                    <h3 class="anime-title">${title}</h3>
                    <div class="anime-details">
                        <div class="anime-score">⭐ ${score}</div>
                        <div class="anime-year">${year}</div>
                    </div>
                    <p class="anime-synopsis">${synopsis}</p>
                </div>
            </div>
        `;
    }).join('');
}


function toggleFavorite(animeId) {

    const favoriteIndex = favorites.findIndex(fav => fav.mal_id === animeId);
    
    if (favoriteIndex !== -1) {

        favorites.splice(favoriteIndex, 1);
    } else {

        const anime = lastSearchResults.find(a => a.mal_id === animeId);
        if (anime) {
            favorites.push(anime);
        }
    }
    

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    

    const activeTab = document.querySelector('.tab.active').dataset.tab;
    if (activeTab === 'search') {
        updateSearchResultsFavorites();
    } else {
        loadFavorites();
    }
}


function updateSearchResultsFavorites() {
    document.querySelectorAll('.anime-card').forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn');
        const animeId = parseInt(favoriteBtn.dataset.id);
        const isFavorite = favorites.some(fav => fav.mal_id === animeId);
        
        if (isFavorite) {
            card.classList.add('is-favorite');
            favoriteBtn.textContent = '❤️';
        } else {
            card.classList.remove('is-favorite');
            favoriteBtn.textContent = '🤍';
        }
    });
}


function loadFavorites() {
    if (favorites.length === 0) {
        favoritesArea.innerHTML = `<div class="message">You haven't added any favorites yet.</div>`;
        return;
    }
    
    favoritesArea.innerHTML = `<div class="anime-grid">${renderAnimeCards(favorites)}</div>`;
    

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const animeId = parseInt(btn.dataset.id);
            toggleFavorite(animeId);
        });
    });
}