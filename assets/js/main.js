function cria_tabela_pokemons(type) {
    
    Promise.all(type)
        .then(pokemons => {
            console.log(pokemons)

            const lis_Pokemons = pokemons.reduce((ac, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                ac += `
                <li class="card ${types[1]}" style="width: 100%; border: 1px solid #722BCC; margin: 3px; background-color: #722BCC; border-radius: 15px; display: flex; align-items; center; flex-direction: column; justify-content: center">
                <img class="card-image ${types[0]} col" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" style=" opacity: 0.7">
                <div class="card-body" style="padding: 0.5rem; width: 100%; height: 15vh;border-top: 3px solid #fcfcfcca; border-radius: 0% 0% 15px 15px; display: flex; align-items; center; flex-direction: column; justify-content: space-around">
                <p class="card-subtitle" style="font-size: 1rem; color: white">n ${pokemon.id}</p>
                <h2 class="card-title" style="color: white; font-size: 1rem">${pokemon.name}</h2>
                <p class="card-subtitle"style="font-size: 12px; width: 60%; background-color: #fcfcfcca; padding: 1px; border-radius: 15px; text-align: center;">${types.join(' | ')}</p>
                </div>
                </li>
                `

                return ac

            }, '')


            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lis_Pokemons

        })
} 


function exibe_tabela() {
    const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    let pokemons_lista = [];

    for(let i = 1; i <= 150; i++) {
        pokemons_lista.push(fetch(url(i))
            .then(response => response.json()))
    }

    cria_tabela_pokemons(pokemons_lista)
    
}
document.querySelector('.caixa-dois').addEventListener('click', exibe_tabela)
exibe_tabela()


document.querySelector('.pokebola').addEventListener('click', numero_aleatorio)
function numero_aleatorio() {
    const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    let pokemons_lista = [];

    const num_ale = parseInt(Math.random() * 150)

    pokemons_lista.push(fetch(url(num_ale)).then(response => response.json()))

    cria_tabela_pokemons(pokemons_lista)
}

const input = document.querySelector('.input-pesquisa')
input.addEventListener('keydown', pesquisa_pokemon)
function pesquisa_pokemon(event) {
    if(event.key == 'Enter') {
        const input = document.querySelector('.input-pesquisa').value

        const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`

        let pokemons_lista = [];

        pokemons_lista.push(fetch(url(input)).then(response => response.json()))

        // if(pokemons_lista.includes(input)) {
        //     console.log('tem')
        //     cria_tabela_pokemons(pokemons_lista)
        // } else {
        //     console.log('nao')
        // }

        cria_tabela_pokemons(pokemons_lista)

        
        
    }

}

