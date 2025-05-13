# Anime Search App

An interactive web application to search for anime using the Jikan API and manage your favorites.


## Features

- 🔍 Search anime by name
- ⭐ Save your favorite anime to a collection
- 🌙 Dark/Light theme toggle
- 📱 Responsive design for desktop and mobile devices


## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [Jikan API](https://jikan.moe/) - Unofficial MyAnimeList API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anime-search-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd anime-search-app
   ```

3. Open `Search.html` in your preferred browser or use a local server:
   ```bash
   # If you have Python installed:
   python -m http.server
   # Then visit http://localhost:8000 in your browser
   ```

## How to Use

1. Enter an anime title in the search bar
2. Click the search button or press Enter
3. Browse through the search results
4. Click the heart icon to add anime to your favorites
5. Toggle between search results and favorites using the tabs
6. Switch between light and dark mode using the theme toggle button

## Project Structure

```
anime-search-app/
│
├── Search.html         # Main HTML file
├── Search.css          # Styling file
├── Search.js           # JavaScript functionality
└── README.md           # Project documentation
```

## API Reference

This project uses the [Jikan API v4](https://docs.api.jikan.moe/) to fetch anime data. The main endpoint used is:

```
GET https://api.jikan.moe/v4/anime?q={query}&sfw=true&limit=20
```

## Features in Detail

### Search Functionality
Users can search for anime by title. The app fetches data from the Jikan API and displays up to 20 results.

### Favorites System
- Add/remove anime from favorites with a single click
- Favorites are stored in the browser's local storage
- Easily switch between search results and favorites collection

### Theme Toggle
The app supports both light and dark themes. The selected theme is saved in local storage and persists between sessions.

### Responsive Design
The application is designed to work well on screens of all sizes, from desktop to mobile.

## Browser Compatibility

The application has been tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Add pagination for search results
- Implement anime details page
- Add sorting and filtering options
- Enhance mobile experience

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing anime data
- [MyAnimeList](https://myanimelist.net/) as the original data source
- [Poppins Font](https://fonts.google.com/specimen/Poppins) from Google Fonts
