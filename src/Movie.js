import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link } from 'react-router-dom'
import {useHistory} from "react-router-dom";



const Movie = () => {
        const [find, setFind] = useState('')
        const [page, setPage] = useState(1)
        const [movie, setMovie] = useState([])
        const history = useHistory()

    useEffect(() => {
        axios (`http://api.themoviedb.org/3/discover/movie?page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => console.log(setMovie(data.results)))
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    const handleSearch = (e) => {
        setFind(e.target.value)
    }
    const findMovie = () => {
        history.push(`search/${find}`)
    }
    findMovie()
    return (
        <div>
            <div className="header d-flex justify-content-between">
                <Link to='/'>
                    <h2>Home</h2>
                </Link>
                <div>
                    <input type="text" placeholder='search for movie' id='cinema'  onChange={handleSearch} className='input'/>
                    <Link to={`/search/${find}`} ><span className='btn'>Find</span></Link>
                </div>
            </div>
            {
                Array(6).fill(0).map((elem, index) =>
                    <button onClick={() => handlePage(index+1)} value={page} className='button btn-primary mx-1'>{index+1}</button>
                )
            }
            <div className='row align-items-start search'>
                {
                    movie.map((elem) =>
                        <div className='col' key={elem.id}>
                            <Link to={`/movie-details/${elem.id}`}>
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${elem.backdrop_path}`} alt=""/>
                                    <p>{elem.original_title}</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Movie;