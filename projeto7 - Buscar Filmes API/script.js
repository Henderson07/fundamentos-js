function searchMovie() {
    const apiKey = ''; // Substitua pelo seu próprio API Key do OMDB
    const movieTitle = $('#movie-search').val();

    if (movieTitle.trim() !== '') {
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`,
            method: 'GET',
            success: function (data) {
                displayMovieDetails(data);
            },
            error: function (error) {
                displayError('Filme não encontrado. Verifique o título e tente novamente.');
            }
        });
    } else {
        displayError('Por favor, insira o nome do filme.');
    }
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = $('#movie-details');
    movieDetailsContainer.empty();

    if (movie.Response === 'True') {
        movieDetailsContainer.append(`
            <h2>${movie.Title}</h2>
            <p><strong>Ano:</strong> ${movie.Year}</p>
            <p><strong>Classificação:</strong> ${movie.Rated}</p>
            <p><strong>Elenco:</strong> ${movie.Actors}</p>
            <p><strong>Enredo:</strong> ${movie.Plot}</p>
            <img src="${movie.Poster}" alt="${movie.Title}" width="200">
        `);
    } else {
        displayError('Filme não encontrado. Verifique o título e tente novamente.');
    }
}

function displayError(message) {
    const movieDetailsContainer = $('#movie-details');
    movieDetailsContainer.empty();
    movieDetailsContainer.append(`<p class="error">${message}</p>`);
}