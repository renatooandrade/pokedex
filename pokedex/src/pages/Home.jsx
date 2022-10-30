import React from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import {Container} from '@mui/system'
import {Grid} from "@mui/material"
import axios from "axios"
import { useEffect } from 'react';
import { useState } from 'react';




function Home() {
   
    const qtd = 100;

    const [pokemons, setPokemons]= useState([])


    useEffect(()=>{
        getPokemons();
    },[])


    const getPokemons = ()=>{
        var endpoints = [];

        for(var i=1 ; i<=qtd ; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

       axios.all(endpoints.map((endpoint)=> axios.get(endpoint))).then((res)=>{setPokemons(res)})
                                                                                .catch((err)=>{console.log(err)})
        

        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${qtd}`).then((res)=>setPokemons(res.data.results))
                                                                .catch((err)=>console.log(err))
    }

    const pokemonFilter = (name)=>{
        var filteredPokemons = [];
        for(var pokemon in pokemons ){
            if(pokemons[pokemon].data.name.includes(name)){
                filteredPokemons.push(pokemons[pokemon])
            }
        }
        console.log(filteredPokemons)
        setPokemons(filteredPokemons)

        if(name===""){getPokemons()}
    }

    return ( 
        <div>

        <Navbar pokemonFilter={pokemonFilter}></Navbar>
        <Container maxWidth='false  '>

            <Grid container display="flex" justifyContent="center">
                    {pokemons.map((pokemon, key)=>
                    <Grid item xs={12} sm={6} md={4} lg={2.1} key={key}>
                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}></PokemonCard>
                    </Grid>
                )}
                
                
                
            </Grid>

        </Container>
        </div>
     );
}

export default Home;