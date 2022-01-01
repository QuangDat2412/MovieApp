import React from 'react';
import './topBar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authRedux/apiCalls';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
export default function TopBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch);
        history.push('/');
    };
    const currentUser = useSelector((state) => {
        return state.auth.currentUser;
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="topBar">
            <div>
                <div className="topLeft">
                    <span className="logo">Movie App</span>
                </div>
                <div className="topRight">
                    <div
                        id="dropdown-button"
                        aria-controls="dropdown-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick1}
                    >
                        <img src={currentUser.img} alt="" className="topAvatar" />
                    </div>
                    <Menu
                        className="menuDropdown"
                        id="dropdown-menu"
                        aria-labelledby="dropdown-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>{currentUser.fullName}</MenuItem>
                        <MenuItem onClick={handleClose}>Setting</MenuItem>
                        <MenuItem onClick={handleClick}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}
