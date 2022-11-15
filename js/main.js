
let apiKey = '563492ad6f917000010000013e4d2581c9e34b23a20d0b1a330e3166';
let nextLink = '';

let photoTheme = document.querySelector('#picSelect');
let searchBut = document.querySelector('#searchPic');

searchBut.addEventListener('click', () => {
    removePhotos();
});


function getPhotos(theme) {


    fetch(`https://api.pexels.com/v1/search?query=${theme}`, {
        headers: {
            'Authorization': apiKey
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        console.log(nextLink);
        nextLink = json.next_page;
        console.log(nextLink + "!!!");
        return showPhotos(json.photos),  createPages(json.page, json.per_page);});
}

function changePhotosPage(numberPage, previousPage) {
    console.log(numberPage);
    console.log(previousPage);
    console.log(nextLink.replace(previousPage, numberPage));
}

function createPages(currentPage, amountPage) {
    let changeBlock = document.querySelector('.change__block');

    if(changeBlock.childNodes.length > 0) {
        clearPages();
    }
    for(let i = 1; i <= amountPage; i++) {
        let newPage = document.createElement('div'),
            numberPage = document.createElement('span');

        numberPage.textContent = i;
        newPage.append(numberPage);
        newPage.addEventListener('click', changePage);

        changeBlock.append(newPage);
        if(i == +currentPage) {
            newPage.classList.add('current__page');
        } else {
            newPage.classList.add('page');
        }
    }
}

function changePage(event) {;
    let previousPage = document.querySelector('.current__page').textContent; // Номер предыдущей страницы
    clearCurrentPage();
    if(event.target.tagName == "DIV") {
        event.target.classList.add('current__page');
        changePhotosPage(event.target.textContent, previousPage);
    }else {
        event.target.parentNode.classList.add('current__page');
        changePhotosPage(event.target.textContent, previousPage);
    }
}

function clearCurrentPage() {
    let pages = document.querySelectorAll('.current__page');
    pages.forEach((page) => {
        page.classList.remove('current__page');
        page.classList.add('page');
    })
}

function clearPages(mainBlock) {
    let blocks = document.querySelectorAll('.page').forEach((block) => block.remove());

}

function removePhotos() {
    let promise = new Promise((resolve, reject) => {
        let mainBlock = document.querySelector('.photos__blocks');
        resolve(mainBlock);
    }).then((mainBlock) => {
        if(mainBlock.childNodes.length>1){
            let blocks = document.querySelectorAll('.photo__block');
            blocks.forEach((block) => {
                block.remove();
            })
        }
    }).finally(() => {
        console.log("Сработал");
        getPhotos(photoTheme.value);
    });


}

function showPhotos(data) {
    
    data.forEach((key) => {
        createNewPost(key);
        console.log(key);
    });
};

function createNewPost(info) {
    let block = document.querySelector('.photos__blocks');

    let photoBlock = document.createElement('div');
    photoBlock.classList.add('photo__block');

    let photo = document.createElement('img');
    photo.src = info.src.portrait;
    photo.classList.add('photo__img');

    let photographerName = document.createElement('span');
    photographerName.textContent = `Фотограф: ${info.photographer}`;

    let photoName = document.createElement('h3');
    photoName.textContent = info.alt;



    photoBlock.append(photo, photoName, photographerName);
    block.append(photoBlock);
}