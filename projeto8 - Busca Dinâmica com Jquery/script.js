$(document).ready(function () {
    const searchInput = $('#search-input');
    const suggestionsContainer = $('#suggestions-container');
    const postList = $('#post-list');
    const clearButton = $('#clear-button'); // Adiciona a referência ao botão de limpar

    let allPosts;

    // Realiza uma chamada AJAX para obter os dados do arquivo JSON
    $.ajax({
        url: 'posts.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            allPosts = data;
            // Atualiza a lista de postagens inicialmente
            updatePostList(allPosts);
        },
        error: function (error) {
            console.error('Erro ao carregar postagens:', error);
        }
    });

    searchInput.on('input', function () {
        const query = searchInput.val().toLowerCase();

        if (query.trim() !== '') {
            const filteredPosts = allPosts.filter(post => post.title.toLowerCase().includes(query));
            displaySuggestions(filteredPosts);
        } else {
            suggestionsContainer.empty();
        }
    });

    clearButton.on('click', function () {
        // Limpa o campo de busca e reexibe todas as postagens
        searchInput.val('');
        updatePostList(allPosts);
    });

    function displaySuggestions(suggestedPosts) {
        suggestionsContainer.empty();

        suggestedPosts.forEach(function (post) {
            const suggestionItem = $('<div class="suggestion"></div>');
            suggestionItem.text(post.title);
            suggestionItem.on('click', function () {
                searchPostByTitle(post.title);
                suggestionsContainer.empty();
            });

            suggestionsContainer.append(suggestionItem);
        });
    }

    function updatePostList(posts) {
        postList.empty();

        posts.forEach(function (post) {
            const postItem = $('<div class="post"></div>');
            postItem.append(`<h3>${post.title}</h3>`);
            postItem.append(`<img src="${post.image}" alt="${post.title}" onerror="this.src='placeholder.png';">`);
            postList.append(postItem);
        });
    }

    function searchPostByTitle(title) {
        const foundPost = allPosts.find(post => post.title === title);

        if (foundPost) {
            updatePostList([foundPost]);
        }
    }
});