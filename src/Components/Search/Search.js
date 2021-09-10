import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory, useParams} from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState({})
    const [isFind, setFind] = useState('')
    const [findPage, setFindPage] = useState(1)
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()
    const {find} = useParams()


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie?api_key=6f19f87e3380315b9573c4270bfc863c&language=en-US&query=${find}&page=${findPage}`)
            .then(({data}) => {
                setSearch(data)
                setLoading(false)})
        console.log(search)
    }, [findPage, find, search])
    const handleSearch = (e) => {
        setFind(e.target.value)

    }
    const clear = () => {
        history.push(`search/${find}`)
        setFind('')

    }
    if (isLoading) {
        return <h2>Loading....</h2>
    }

    let pageButtons = '';
    if (search.total_pages > 1 && findPage === 1){
        pageButtons =  (
            <button onClick={() => {setFindPage(findPage+1)}} className='btn'>Next</button>
        )

    } else if(search.total_pages > findPage && findPage > 1){
        pageButtons = (
            <>
                <button onClick={() => setFindPage (findPage-1)} className='btn'>Prev</button>
                <button onClick={() => setFindPage (findPage+1)} className='btn'>Next</button>
            </>
        )
    }

    return (

        <div className='row align-items-start search'>
            <div className='form'>
                <span className='mb-10'>{pageButtons}</span>
                <div>
                    <input type="text" value={isFind} placeholder='search for movie' id='cinema'  onChange={handleSearch} className='input' />
                    <Link to={`/search/${isFind}`} onClick={clear}><span className='btn' >Find</span></Link>
                </div>
            </div>
            {search.results.map(elem =>
                <div className='col' key={elem.id}>
                    <Link to={`/movie-details/${elem.id}`}>
                        <img src={ elem.backdrop_path? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${elem.backdrop_path}` : "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"} alt=""/>
                        <p>{elem.original_title}</p>
                    </Link>
                </div>
            )
            }
        </div>
    );
};

export default Search;