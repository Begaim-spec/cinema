import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Fancy from "../../Components/Fancy";
import Spinner from '../../Components/Spinner'
import Time from '../../Components/Time'
import ReadMore from '../../Components/ReadMore'
import img from '../../images/img.png'


const MovieDetails = () => {
    const [movie, setMovie] = useState([])
    const [actors, setActors] = useState([])
    const [isActorsLoading, setActorsLoading] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [trailer, setTrailer] = useState({})
    const [trailerLoading, setTrailerLoading] = useState(true)
    const {person} = useParams()
    const time = movie.runtime

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${person}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setMovie(data)
                setLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${person}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                (setActors(data.cast))
                setActorsLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${person}/videos?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailer(data.results)
                setTrailerLoading(false)
            })

    }, [person])
    if (isLoading && trailerLoading && isActorsLoading) {
        return <div><Spinner isLoading={isLoading} /></div>

    }
    return (
        <div className='container space my-50 search'>
            <div className="row align-items-start">
                <Link to='/'>
                    <h2>Home</h2>
                </Link>
                <div>
                    <div key={movie.id} className='movie-details' >
                        <div className='info-box'>
                            <h3 className='movie-info-title'>About movie</h3>
                            <p> <span className='movie-info-title'>Дата:</span> {movie.release_date} </p>
                            <Time time={time}/>
                            <div className='my-4 ml-5'><span className='movie-info-title'>Жанры:</span>
                                {movie.genres.map(el =>
                                <span> {el.name},</span>)
                                }
                                <p className='budget'> <span className='movie-info-title'>Бюджет:</span> $ {movie.budget === 0? 'Без финансирования' :  movie.budget.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') } </p>
                            </div>
                        </div>
                        <div className='movie-box'>
                            <h1>{movie.original_title}</h1>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    {
                                        <img src= {movie.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"}
                                             alt="" className='img-thumbnail'/>
                                    }
                                    <p className="text-break mr-10 description">Обзор: {movie.overview}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='actors-title'>Актерский состав</p>
                    {
                        <OwlCarousel className='owl-theme' loop margin={1}>
                            {
                                actors.slice(0, 5).map(actor =>
                                    <>
                                        <div className="box" key={actor.id}>
                                           <Link to={`/actor-details/${actor.id}`}>
                                               {
                                                   <img src= {actor.profile_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"}
                                                        alt="" className='img-thumbnail'/>
                                               }
                                           </Link>
                                        </div>
                                    </>
                                )
                            }
                                <ReadMore />
                        </OwlCarousel>
                    }
                </div>
            </div>
            <div>
                <p>Трейлер:</p>
                {!trailerLoading && trailer.map(elem => <Fancy key={elem.id} id={elem.key}/>)}
            </div>
        </div>
    );
};

export default MovieDetails;