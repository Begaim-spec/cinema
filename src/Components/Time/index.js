import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Index = ({time}) => {
    const [movie, setMovie] = useState([])
    const {person} = useParams()
    const Hours = Math.floor(time /60)
    const minutes = time % 60


    console.log(Hours)
    console.log(minutes)
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${person}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setMovie(data)
            })

    }, [person])

    return (
        <p> <span className='movie-info-title'>Длительность:</span> {movie.runtime/time}ч. {movie.runtime%minutes} минут</p>

    );
};

export default Index;