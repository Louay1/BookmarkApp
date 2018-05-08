// Listen for form Submit

document.getElementById('formu').addEventListener('submit', saveBookmark);

// To save bookmarks
function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (!siteName || !siteUrl) {
        alert("Please complete the form !");
        return false;
    }

    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set it back to local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    e.preventDefault();
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var index = 0; index < bookmarks.length; index++) {
        if (bookmarks[index].url === url) {
            bookmarks.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    location.reload();
}

function fishBookies() {
    // Get bookmarks from local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get Output id
    var bookmarksResult = document.getElementById('bookmarksResult');

    //Build output
    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;


        bookmarksResult.innerHTML +=
            '<div class="well">' +
            ' <h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
            ' <a onclick="deleteBookmark(\'' + url + '\');" class="btn btn-danger" href="#">Delete</a>'
        '</h3>' +
        '</div>';
    }
}