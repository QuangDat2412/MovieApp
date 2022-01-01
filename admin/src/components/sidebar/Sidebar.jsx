import './sidebar.scss';
import { LineStyle, PermIdentity, Storefront } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">User</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/newuser" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                New User
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Movie</h3>
                    <ul className="sidebarList">
                        <Link to="/movies" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Movies
                            </li>
                        </Link>
                        <Link to="/newmovie" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                New Movie
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
