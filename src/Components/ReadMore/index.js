import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from "axios";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const ReadMore = () => {
    const [visibleBlogs, setVisibleBlogs] = useState(5)
    const [addActors, setAddActors] = useState([])
    const {person} = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${person}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => console.log(setAddActors(data.cast)))

    }, [person])


    const handleClick = () => {
        setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 100)
    }

    const cardComponent = addActors.slice(6, visibleBlogs).map((item) => {
        return (
            <>
                <div className="box" key={item.id}>
                    <Link to={`/actor-details/${item.id}`}>
                        {
                            <img src= {item.profile_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.profile_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"}
                                 alt="" className='img-thumbnail'/>
                        }
                    </Link>
                </div>
            </>
        );
    });

    return (
        <div>
            {cardComponent}
            <button type="button" onClick={handleClick}>
                Показать еще
            </button>
        </div>
    )
}
export default ReadMore