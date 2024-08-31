
const urlApi = "https://pokeapi.co/api/v2/pokemon/";

const caja = document.querySelector("#row");
const labels = ['types', 'abilities'];
const rowPost = document.querySelector("#rowPost");

const verDetalle = (nodo, urlDetalle, pokemonName) => {
    nodo.addEventListener(('click'), () => {
        rowPost.innerHTML = '';
        let cardPost = document.createElement('div');
        let bodyPost = document.createElement('div');
        let namePok = document.createElement('h3');
        cardPost.className = "card-post";
        bodyPost.className = "body-post";
        namePok.appendChild(document.createTextNode(pokemonName));
        bodyPost.appendChild(namePok);

        fetch(`${urlDetalle}`).then(response => {
            response.json().then(res => {
                labels.forEach(label => {
                    let labelD = document.createElement('h4');
                    labelD.appendChild(document.createTextNode(label));
                    bodyPost.appendChild(labelD);
                    res[label].forEach(detalle => {
                        let textD = document.createElement('p');
                        if (label == "types") {
                            textD.appendChild(document.createTextNode(detalle.type.name));

                        } else if (label == "abilities") {
                            textD.appendChild(document.createTextNode(detalle.ability.name));
                        }
                        bodyPost.appendChild(textD);
                    });
                });
                cardPost.appendChild(bodyPost);
                rowPost.appendChild(cardPost);
            });
        });
    });
}

fetch(`${urlApi}`).then( response => {
    response.json().then( res => {
        res.results.forEach(element => {
            let card = document.createElement('div');
            card.className = "card";
            let title = document.createElement('h2');
            title.appendChild(document.createTextNode(element.name));
            card.appendChild(title);
            caja.appendChild(card);

            verDetalle(card, element.url, element.name);
        });
    })
});