import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Type from './pages/Type';
import Year from './pages/Year';
import Genre from './pages/Genre';
import Detail from './pages/Detail';
import Country from './pages/Country';
import Search from './pages/Search';
import Watch from './pages/Watch';
import Personal from './pages/Personal';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import MobileModal from './components/MobileModal';
import './App.scss';
import '../src/assets/css/style.scss';
const App = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openMobileModal, setOpenMobileModal] = useState(false);
    return (
        <Router>
            <Switch>
                <>
                    <TopBar
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        openMobileModal={openMobileModal}
                        setOpenMobileModal={setOpenMobileModal}
                    />
                    {openMobileModal && <MobileModal setOpenMobileModal={setOpenMobileModal} setOpenModal={setOpenModal} />}
                    {openModal && <Modal setOpenModal={setOpenModal} />}
                    <Route exact path="/">
                        <Home setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/detail/:slug">
                        <Detail openModal={openModal} setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/watch/:slug">
                        <Watch setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/personal/:slug">
                        <Personal />
                    </Route>
                    <Route path="/type/:slug">
                        <Type setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/year/:slug">
                        <Year setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/country/:slug">
                        <Country setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/genre/:slug">
                        <Genre setOpenModal={setOpenModal} />
                    </Route>
                    <Route path="/search/:slug">
                        <Search />
                    </Route>
                    <Footer />
                </>
            </Switch>
        </Router>
    );
};

export default App;
