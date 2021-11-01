import pokemonApi from '../api/pokemonApi';

//Creamos el arreglo.
export const getPokemons = () => {

    const pokemonArr = Array.from( Array(650) ); //El método Array.from() crea una nueva instancia de Array a partir de un objeto iterable.
    return pokemonArr.map( (_, index ) => index +1 ); // _, es el valor del elemento actual pero no nos interesa en este ejercicio
}                                                     // getPokemons nos devuelve un array de 650 posiciones vacio  

//Mezclamos el arreglo y obtenemos los nombres de los 4 primeros elementos.
const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons().sort( () => Math.random() -0.5 );   // El array se ordena según un patrón aleatorio
    
    const pokemons = await getPokemonNames( mixedPokemons.splice(0, 4));     // Del array cortaremos los 4 elementos primeros y obtendremos sus nombres

    return pokemons; //[{}]
}

export const getPokemonNames = async( [a,b,c,d] = [] ) => { // Desestructuramos el array de 4 elementos y obtenemos sus ids

    const promiseArr = [                    // Array de peticiones
        pokemonApi.get(`${ a }`),
        pokemonApi.get(`${ b }`),
        pokemonApi.get(`${ c }`),
        pokemonApi.get(`${ d }`),
    ];
    const [ p1, p2, p3, p4 ] = await Promise.all( promiseArr ); // Resolución de las peticiones en un [{}]
   
    return [
        { name: p1.data.name, id:p1.data.id },
        { name: p2.data.name, id:p2.data.id },
        { name: p3.data.name, id:p3.data.id },
        { name: p4.data.name, id:p4.data.id },
    ]
}

export default getPokemonOptions;