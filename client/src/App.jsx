import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Type from './pages/type/Type';
import Year from './pages/year/Year';
import Genre from './pages/genre/Genre';
import Info from './pages/info/Info';
import Country from './pages/country/Country';
import Search from './pages/search/Search';
import Watch from './pages/watch/Watch';
import Personal from './pages/personal/Personal';
import TopBar from './components/topBar/TopBar';
import './App.scss';
const App = () => {
    return (
        <Router>
            <Switch>
                <>
                    <TopBar />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/info/:slug">
                        <Info />
                    </Route>
                    <Route path="/watch/:slug">
                        <Watch />
                    </Route>
                    <Route path="/personal/:slug">
                        <Personal />
                    </Route>
                    <Route path="/type/:slug">
                        <Type />
                    </Route>
                    <Route path="/year/:slug">
                        <Year />
                    </Route>
                    <Route path="/country/:slug">
                        <Country />
                    </Route>
                    <Route path="/genre/:slug">
                        <Genre />
                    </Route>
                    <Route path="/search/:slug">
                        <Search />
                    </Route>
                </>
            </Switch>
        </Router>
    );
};

export default App;
