import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom'

const ActorDetails = () => {
    const [actor, setActor] = useState([])
    const [actingDate, setActingDate] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [actorLoading, setActorLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                ( setActor(data))
                setActorLoading(false)
            })

        axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                (setActingDate(data.cast))
                setLoading(false)
            })
    }, [id])
    if (actor.gender === 1 ){
        (actor.gender = 'c')
    }

    if (isLoading && actorLoading){
        return 'Loading...'
    }


    return (
        <div>
            <Link to='/'>
                <h2>Home</h2>
            </Link>
            <div className='row'>
                <div className='col-4'>
                    <div className="personal-info">
                        {
                            <img src= {actor.profile_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"}
                                 alt="" className='img-thumbnail'/>
                        }                    <h3 className='info-title'>Персональная информация</h3>
                        <div className="biography-box">
                            <p> </p>
                            <p>Дата рождения {actor.birthday} </p>
                            <p>Место рождения {actor.place_of_birth}</p>
                            <p>Также известен как {actor.also_known_as}</p>
                            <p>Популярность {actor.popularity}</p>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="personal-info">
                        <p className='text-align:center'>{actor.name}</p>
                        <p className='mt-50'>Биография</p>
                        <p>{actor.biography}</p>
                        <div className='acting-date'>
                            <h2>Актерское искусство</h2>
                            <ul>{
                                actingDate.filter((item) => item.release_date !== '').map(elem =>
                                    <li className='date-list'> -     <Link to={`/movie-details/${elem.id}`}>{elem.original_title}</Link></li>
                                )
                            }
                                {
                                    actingDate.sort((a, b) =>
                                        Date.parse(b.release_date) - Date.parse(a.release_date)).map(item =>
                                        <Link to={`/movie-details/${item.id}`}>
                                            <li className='date-list'>
                                                <span className='acting-year'>{item.release_date}</span>
                                                <span>{item.original_title}</span>
                                            </li>

                                        </Link>
                                    )
                                }
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ActorDetails;