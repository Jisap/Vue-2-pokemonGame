import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock';


describe('Pokemonpage Component', () => {

    let wrapper
    
    beforeEach(() => {
        wrapper = shallowMount( PokemonPage )
    })
    
    test('debe hacer match con el snapshot', () => {
        expect( wrapper.html()).toMatchSnapshot()
    });
    
    
    test('debe de llamar mixPokemonArray al montar', () => {
        console.log(PokemonPage.methods)
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods , 'mixPokemonArray' )
        shallowMount( PokemonPage )
        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    });
    
    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
       const wrapper = shallowMount( PokemonPage, {
           data(){
               return {
                   pokemonArr: pokemons,
                   pokemon: pokemons[0],
                   showPokemon:false,
                   showAnswer:false,
                   message:'',
               }
           }
       });
       expect( wrapper.html()).toMatchSnapshot();
    });

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        
        const wrapper = shallowMount( PokemonPage, {
           data(){
               return {
                   pokemonArr: pokemons,
                   pokemon: pokemons[0],
                   showPokemon:false,
                   showAnswer:false,
                   message:'',
               }
           }
       });

       expect( wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
       expect( wrapper.find('pokemon-options-stub').exists()).toBeTruthy()
       expect( wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe("1")
       expect( wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy()
       
    });
    
    test('pruebas con checkAnswer', async() => {
        
        const wrapper = shallowMount( PokemonPage, {    // Montamos el componente
           data(){
               return {
                   pokemonArr: pokemons,
                   pokemon: pokemons[0],//Bulbasaur id=1
                   showPokemon:false,
                   showAnswer:false,
                   message:'',
               }
           }
       });

       await wrapper.vm.checkAnswer(1);                     // Simulamos que la respuesta en las opciones es 1 (selectId)
       expect( wrapper.find('h2').exists()).toBeTruthy()    // Esperariamos que se encontrará en el wrapper un h2 respondiendo a la opción seleccionada
       console.log(wrapper.find('h2').text())               // Bulbasaur
       expect( wrapper.vm.showPokemon ).toBeTruthy()        // Esperariamos que la prop showPokemon = true () puesto que selectedId=pokemon[0]
       expect( wrapper.find('h2').text()).toBe(`Correcto, ${ pokemons[0].name}`) // Ademas el mensaje debería = 'Correcto, Bulbasaur'
    
       await wrapper.vm.checkAnswer(10)
       expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemons[0].name }`)
    });
    
});
