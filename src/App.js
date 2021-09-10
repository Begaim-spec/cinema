import Movie from "./Movie";
import ActorDetails from "./Views/ActorDetails/ActorDetails";
import MovieDetails from './Views/MovieDetails/MovieDetails'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Search from "./Components/Search/Search";

function App() {
    return (
        <div className='container-md'>
            <Router className="App">
                <Route exact path='/'><Movie/></Route>
                <Route path='/movie-details/:person'><MovieDetails/></Route>
                <Route path='/actor-details/:id'><ActorDetails/></Route>
                <Route path='/search/:find'><Search /></Route>
            </Router>
        </div>
    );
}

export default App;
