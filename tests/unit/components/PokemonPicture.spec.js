import { shallowMount } from '@vue/test-utils';
import  PokemonPicture from '@/components/PokemonPicture'


describe('PokemonPicture componet', () => {
    
    test('debe de hacer match con el snapshot', () => {
        const wrapper = shallowMount( PokemonPicture, { 
            props:{
                pokemonId: 1,
                showPokemon:false
            }
        } );
        expect( wrapper.html() ).toMatchSnapshot()
    });
    
    test('debe de mostrar la imagen oculta y el pokemon 100', () => {
        const wrapper = shallowMount( PokemonPicture, { 
            props:{
                pokemonId: 100,
                showPokemon:false
            }
        })

        const [ img1, img2 ] = wrapper.findAll('img');          // Buscamos todas las imagenes del wrapper

        expect( img1.exists()).toBeTruthy();                    // La 1ª imagen debe esta definida
        expect( img2 ).toBe( undefined );                       // la segunda no por el v-else
        expect( img1.classes('hidden-pokemon')).toBeTruthy();   // La 1ª imagen debe tener la clase hidden-pokemon
        expect( img1.attributes('src')).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg")
    });
    
    test('debe de mostrar el pokemon si showPokemon:true', () => {
        const wrapper = shallowMount( PokemonPicture, { 
            props:{
                pokemonId: 100,
                showPokemon:true
            }
        })

        const img1 = wrapper.find('img');                       // Solo vamos a buscar la imagen que este definida
        //console.log(img1.classes())
        //console.log(wrapper.html())
        expect( img1.exists()).toBeTruthy();                    // La imagen que encuentre debe estar definida (renderizada)
        expect( img1.classes('hidden-pokemon')).toBe(false);    // Esa imagen debe tener la clase 'hidden-pokemon en false
        expect( img1.classes('fade-in')).toBe(true);            // y la clase 'fade-in' activada
    });
    
});
