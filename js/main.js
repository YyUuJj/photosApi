// fetch('https://api.api-ninjas.com/v1/cats?shedding=2', {
//     method: "GET",
//     headers: {
//         'X-Api-Key': 'amalbOI5x7BGt+FExLtoYg==aLvichKbtJSqSPix'
//     }
// })
// .then((response) => response.json())
// .then(json => createCat(json[0])
// ).catch(() => {
//     console.log("Ошибка");
// })

// function createCat(data) {
//     console.log(data);
//     let b = document.createElement('img');
//     b.src = data.image_link;
//     document.body.append(b);
// }

let apiKey = '563492ad6f917000010000013e4d2581c9e34b23a20d0b1a330e3166';


fetch("https://api.pexels.com/v1/search?query=nature", {
    headers: {
        'Authorization': apiKey
    }
})
.then(response => response.json())
.then(json => showPhotos(json.photos));


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