import { memo } from 'react';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authRedux/apiCalls';
import { Link } from 'react-router-dom';

const FormModal = styled.div`
    display: flex;
    justify-content: flex-start;
    @media screen and (min-width: 1024px) {
        display: none;
    }
`;
const Mask = styled.div`
    position: fixed;
    z-index: 90001;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;
const Paper = styled.div`
    position: fixed;
    top: 0px;
    width: 310px;
    height: 100vh;
    z-index: 90002;
    background-color: rgb(24, 26, 31);
    & > div:nth-child(1) {
        display: flex;
        justify-content: flex-end;
        height: 40px;
        align-items: center;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
        & > svg {
            margin: auto 10px;
        }
    }
`;
const MobileModalContent = styled.div`
    margin-left: 20px;
    & > div {
        padding: 13px 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
    & > div:nth-child(1) {
        & > svg {
            width: 42px;
            height: 42px;
        }
        & > span,
        a {
            padding-left: 20px;
        }
    }
    span,
    a {
        font-size: 1.5rem;
        font-weight: 500;
    }
`;
const MobileModal = (props) => {
    const auth = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
        logout(dispatch);
    };
    const handleClose = () => {
        props.setOpenMobileModal(false);
    };
    return (
        <FormModal>
            <Paper>
                <div>
                    <ClearIcon onClick={handleClose} />
                </div>
                <MobileModalContent>
                    {auth?._id ? (
                        <>
                            <div>
                                <img src={auth.img} alt="" className="topAvatar" />
                                <span>{auth.fullName}</span>
                            </div>
                            <div>
                                <Link to="/personal/settings" onClick={handleClose}>
                                    Cài đặt cá nhân
                                </Link>
                            </div>
                            <div>
                                <Link to="/" onClick={handleClose}>
                                    Đề Xuất
                                </Link>
                            </div>
                            <div>
                                <Link to="/type/phim-le" onClick={handleClose}>
                                    Phim Lẻ
                                </Link>
                            </div>
                            <div>
                                <Link to="/type/phim-bo" onClick={handleClose}>
                                    Phim bộ
                                </Link>
                            </div>
                            <div onClick={handleLogout}>
                                <span>Đăng Xuất</span>
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={() => {
                                props.setOpenModal(true);
                            }}
                        >
                            <PermIdentityIcon />
                            <span>Đăng nhập / Đăng ký</span>
                        </div>
                    )}
                </MobileModalContent>
            </Paper>
            <Mask></Mask>
        </FormModal>
    );
};
export default memo(MobileModal);
