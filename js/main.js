
let apiKey = '563492ad6f917000010000013e4d2581c9e34b23a20d0b1a330e3166';


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
    .then(json => showPhotos(json.photos));
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