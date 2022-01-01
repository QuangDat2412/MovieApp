import { memo } from 'react';
import '../../assets/css/style.scss';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authRedux/apiCalls';

const FormModal = styled.div`
    display: flex;
    justify-content: flex-start;
    @media screen and (min-width: 1024px) {
        display: none;
    }
`;
const Mask = styled.div`
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.5;
`;
const Paper = styled.div`
    position: absolute;
    top: 0px;
    width: 310px;
    height: 100vh;
    z-index: 100002;
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
        padding: 10px 0;
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
        & > span {
            padding-left: 20px;
        }
    }
    span {
        font-size: 2rem;
        font-weight: 600;
    }
`;
const MobileModal = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        logout(dispatch);
    };
    return (
        <FormModal>
            <Paper>
                <div>
                    <ClearIcon
                        onClick={() => {
                            props.setOpenMobileModal(false);
                        }}
                    />
                </div>
                <MobileModalContent>
                    {auth.status === 'Login' ? (
                        <>
                            <div>
                                <img src={auth.currentUser.img} alt="" className="topAvatar" />
                                <span>{auth.currentUser.fullName}</span>
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
