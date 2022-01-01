import Sidebar from './components/sidebar/Sidebar';
import TopBar from './components/topbar/TopBar';
import './App.scss';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import User from './pages/user/edit/User';
import Start from './pages/start/Start';
import UserList from './pages/user/userList/UserList';
import NewUser from './pages/user/newUser/NewUser';
import MovieList from './pages/movie/movieList/MovieList';
import NewMovie from './pages/movie/newMovie/NewMovie';
import Movie from './pages/movie/edit/Movie';
import Episode from './pages/movie/episode/Episode';

import { useSelector } from 'react-redux';

function App() {
    const admin = useSelector((state) => state.auth.currentUser?.isAdmin);
    !admin ? document.body.classList.add('slide2') : document.body.classList.remove('slide2');
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {admin ? <Redirect to="/home" /> : <Start />}
                </Route>
                {admin && (
                    <>
                        <TopBar />
                        <div className="container">
                            <Sidebar />
                            <Route path="/home">
                                <Home />
                            </Route>
                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/user/:userId">
                                <User />
                            </Route>
                            <Route path="/newuser">
                                <NewUser />
                            </Route>
                            <Route path="/movies">
                                <MovieList />
                            </Route>
                            <Route path="/movie/:slug">
                                <Movie />
                            </Route>
                            <Route path="/episode/:slug">
                                <Episode />
                            </Route>
                            <Route path="/newmovie">
                                <NewMovie />
                            </Route>
                        </div>
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;
