import React, {useState, useEffect} from 'react';
import ModalVideo from "react-modal-video";
import {useParams} from "react-router-dom";
import axios from "axios";


const Fancy = ({id}) => {
    const [isOpen, setOpen] = useState(false)
    const [movie, setMovie] = useState([])
    const {person} = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${person}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => console.log(setMovie(data)))
    }, [person])

    return (
            <>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id}
                            onClose={() => setOpen(false)}/>
                <div className='d-inline player-box'>
                    <svg onClick={() => setOpen(true)} xmlns="http://www.w3.org/2000/svg" height="52pt" viewBox="0 -77 512.00213 602" width="52pt"><path d="m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0" fill="#f00"/><path d="m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0" fill="#fff"/></svg>
                    {
                        <img src= {movie.backdrop_path ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.backdrop_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"}
                             alt="" className='img-thumbnail'/>
                    }
                </div>
            </>
    );
};

export default Fancy;