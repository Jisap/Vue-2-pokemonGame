<template>
<div>
  
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <div v-else>
    <h1>¿ Quien es este pokemon ?</h1>
    <PokemonPicture 
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"/> <!--props del modelo PokemonPicture vinculadas aquí con los valores de la data-->
    <PokemonOptions
       :pokemons="pokemonArr"     
       @selection="checkAnswer"/> <!--Prop pokemons vinculada a la data de PokemonPage que recibe el [{}] -->
                                  <!--Aquí estaremos escuchando el evento selection que disparará el método checkAnswer-->
  
    <div v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        Nuevo Juego
      </button>
    </div>  
  
  </div>

</div>
</template>

<script>
import PokemonOptions from "../components/pokemonOptions.vue"
import PokemonPicture from "../components/PokemonPicture.vue"
import getPokemonOptions from '../helpers/getPokemonOptions'

//console.log( getPokemonOptions())

export default {
  components:{ PokemonOptions, PokemonPicture },
  data(){
    return {
      pokemonArr:[],
      pokemon:null,    // pokemon que la persona tiene que adivinar
      showPokemon: false,
      showAnswer: false,
      message: '',
    }
  },
  methods:{ 
    async mixPokemonArray(){
      
      this.pokemonArr = await getPokemonOptions(); // Asignamos el [{}] a la data de esta pokemonPage
      
      const rndInt = Math.floor( Math.random() * 4 ); // Nº aleatorio . Redondeamos un nº aleatorio entre 0,1,2 y 3
      this.pokemon = this.pokemonArr[ rndInt ]        // El pokemon a adivinar estará determinado por este nº aleatorio
    },
    checkAnswer( selectedId ){
      // Este método recibirá el contenido del evento (pokemon seleccionado por el jugador)
      this.showPokemon = true;
      this.showAnswer = true;

      if( selectedId === this.pokemon.id ){
        this.message = `Correcto, ${ this.pokemon.name }`
      }else{
        this.message = `Oops, era ${ this.pokemon.name }`
      }
    },
    newGame(){
      this.showPokemon = false,
      this.showAnswer = false,
      this.pokemonArr = [],
      this.pokemon = null,
      this.mixPokemonArray()
    }, 
  },
  mounted(){
    this.mixPokemonArray();// Cuando el componente se ha montado se llama a este método y se hace la asignacion del [{}] con la prop de pokemonOPtions
  }
}
</script>

