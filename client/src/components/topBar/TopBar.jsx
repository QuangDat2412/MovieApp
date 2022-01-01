/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import '../../assets/css/style.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from '../modal/Modal';
import MobileModal from '../mobileModal/MobileModal';
import SearchBox from '../searchBox/SearchBox';
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './topBar.scss';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../../redux/authRedux/apiCalls';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../requestMethods';

export default function TopBar() {
    window.addEventListener('scroll', () => {
        var scroll = window.scrollY;
        if (scroll >= 100) {
            document.getElementById('navBar')?.classList.add('navBar');
        } else {
            document.getElementById('navBar')?.classList.remove('navBar');
        }
    });
    const KEY = 'pk_test_51Jlwr4F6PLZamBS7ciFKixxTt5J3JXM1NeMVUTju2g0ISci6lP6Z38dDHHQC1AGkKDIqmrP66PyLzUWxCfRQfgEM002KufD8N4';
    const auth = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openMobileModal, setOpenMobileModal] = useState(false);
    const [openSearchBox, setOpenSearchBox] = useState(false);
    const [stripeToken, setStripeToken] = useState(null);
    const handleOpenSearchBox = () => {
        setOpenSearchBox(!openSearchBox);
    };
    const onToken = (token) => {
        setStripeToken(token);
    };
    useEffect(() => {
        if (openModal || openMobileModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [openModal, openMobileModal]);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 100,
                });
                updateUser(auth._id, { isVip: true }, dispatch);
            } catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken]);
    const handleLogout = () => {
        logout(dispatch);
    };
    const convertSlug = (str) => {
        // remove accents
        var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
            to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], 'gi'), to[i]);
        }

        str = str
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\\-]/g, '-')
            .replace(/-+/g, '-');

        return str;
    };
    const genre = [
        'Phiêu Lưu',
        'Hành Động',
        'Kinh Dị',
        'Hài Hước',
        'Thần Thoại',
        'Khoa học',
        'Viễn Tưởng',
        'Tâm lý',
        'Hình sự',
        'Tình cảm',
        'Hoạt Hình',
        'Võ Thuật',
        'Chiến Tranh',
        'Cổ Trang',
    ];

    return (
        <>
            <NavBar id="navBar" className={openSearchBox ? 'navBar' : ''}>
                <div className="container" style={openSearchBox ? { justifyContent: 'center' } : {}}>
                    {!openSearchBox ? (
                        <>
                            <MobileMenu>
                                <MenuIcon
                                    onClick={() => {
                                        setOpenMobileModal(true);
                                    }}
                                />
                            </MobileMenu>
                            <Logo>
                                <Link to="/">
                                    <img src="https://img.icons8.com/bubbles/50/000000/duolingo-logo.png" className="App-logo" alt="logo" />
                                </Link>
                            </Logo>
                            <LeftBar>
                                <div>
                                    <Chanel>
                                        <Link to="/" className="header-item">
                                            Đề Xuất
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <Link to="/type/phim-le" className="header-item">
                                            Phim Lẻ
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <Link to="/type/phim-bo" className="header-item">
                                            Phim bộ
                                            <span className="selected"></span>
                                        </Link>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Thể loại</div>
                                        <List className="list">
                                            {genre.map((g, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link to={'/genre/phim-' + convertSlug(g)}>{g}</Link>
                                                    </li>
                                                );
                                            })}
                                        </List>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Quốc gia</div>
                                        <List className="list">
                                            <li>
                                                <Link to="/country/trung-quoc">Trung Quốc</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/au-my">Âu Mỹ</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/thai-lan">Thái Lan</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/viet-nam">Việt Nam</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/an-do">Ấn độ</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/nhat-ban">Nhật Bản</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/han-quoc">Hàn Quốc</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/dai-loan">Đài Loan</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/hong-konh">Hồng Kông</Link>
                                            </li>
                                            <li>
                                                <Link to="/country/">Khác</Link>
                                            </li>
                                        </List>
                                    </Chanel>
                                    <Chanel>
                                        <div className="header-item">Năm phát hành</div>
                                        <List className="list">
                                            <li>
                                                <Link to="/year/2015">2015</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2016">2016</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2017">2017</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2018">2018</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2019">2019</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2020">2020</Link>
                                            </li>
                                            <li>
                                                <Link to="/year/2021">2021</Link>
                                            </li>
                                        </List>
                                    </Chanel>
                                </div>
                            </LeftBar>
                            <RightBar>
                                <div onClick={handleOpenSearchBox}></div>
                                <SearchBox convertSlug={convertSlug} />
                                <UserBox>
                                    {auth?._id ? (
                                        <>
                                            <div>
                                                <img src={auth.img} alt="" className="topAvatar" />
                                                <List className="list">
                                                    <li>
                                                        <span>{auth.fullName}</span>
                                                    </li>
                                                    <li>
                                                        <Link to="/personal/settings">Cài đặt cá nhân</Link>
                                                    </li>
                                                    <li onClick={handleLogout}>
                                                        <span>Đăng Xuất</span>
                                                    </li>
                                                </List>
                                            </div>
                                        </>
                                    ) : (
                                        <AccountCircleIcon
                                            onClick={() => {
                                                setOpenModal(true);
                                            }}
                                        />
                                    )}
                                </UserBox>
                                {!auth?.isVip && (
                                    <Logo>
                                        <StripeCheckout
                                            name="Movie App"
                                            image="https://avatars.githubusercontent.com/u/1486366?v=4"
                                            description={`Your total is $5.00`}
                                            amount={100}
                                            token={onToken}
                                            stripeKey={KEY}
                                        >
                                            <div>
                                                <img
                                                    src="https://img.icons8.com/dusk/64/000000/vip.png"
                                                    className="App-logo"
                                                    alt="logo"
                                                    style={{ width: '40px', height: '40px' }}
                                                />
                                            </div>
                                        </StripeCheckout>
                                    </Logo>
                                )}
                            </RightBar>
                        </>
                    ) : (
                        <div style={{ alignItems: 'center', display: 'flex', height: '60px' }}>
                            <SearchBox className="searchBoxMobile" convertSlug={convertSlug} />
                            <Button onClick={handleOpenSearchBox} style={{ color: 'white' }}>
                                Huy
                            </Button>
                        </div>
                    )}
                </div>
                {openMobileModal && <MobileModal setOpenMobileModal={setOpenMobileModal} setOpenModal={setOpenModal} />}
                {openModal && <Modal setOpenModal={setOpenModal} />}
            </NavBar>
        </>
    );
}
const NavBar = styled.div`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 20000;
    top: 0px;
    vertical-align: middle;
    background-image: linear-gradient(0deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.75) 100%);
    transition: background-color 0.5s linear 0s;
    .container {
        justify-content: flex-end;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & > div:nth-child(1) {
        height: 100%;
    }
    @media screen and (max-width: 767px) {
        height: 40px;
    }
`;
const MobileMenu = styled.div`
    display: none;
    height: 100%;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    & > svg {
        width: 40px;
        height: 40px;
    }
    @media screen and (max-width: 1023px) {
        display: flex;
    }
    @media screen and (max-width: 767px) {
        & > svg {
            width: 30px;
            height: 30px;
        }
    }
`;
const Logo = styled.div`
    font-size: 0px;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    a {
        margin: auto 0px;
        img {
            width: 40px;
            height: 40px;
        }
    }
    @media screen and (max-width: 767px) {
        height: 40px;
        a {
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
`;
const LeftBar = styled.div`
    height: 100%;
    flex: 1;
    & > div {
        display: flex;
        height: 100%;
        align-items: flex-end;
    }
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const RightBar = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    & > div:nth-child(1) {
        display: none;

        &:hover {
            opacity: 0.7;
        }
    }
    @media screen and (max-width: 1023px) {
        flex: 1;
        justify-content: flex-end;
        & > div:nth-child(1) {
            display: inline-block;
            width: 32px;
            height: 30px;
            margin-top: 2px;
            border: 1 px solid rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            background: url('//www.iqiyipic.com/common/fix/global/search@2x.png') center center / 60% 60% no-repeat rgba(0, 0, 0, 0.2);
        }
    }
`;
const Chanel = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    position: relative;
    &:hover .list {
        display: flex;
    }
    .header-item {
        text-decoration: none;
        opacity: 0.7;
        font-size: 1rem;
        line-height: 1.5rem;
        height: 41px;
        cursor: pointer;
    }
    .header-item:hover {
        opacity: 1;
    }
    span {
        width: 100%;
        height: 3px;
        background: var(--primary-color);
        display: none;
        margin-top: 14px;
    }
    .header-item:hover span.selected {
        display: block;
    }
`;
const UserBox = styled.div`
    margin: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > svg {
        height: 31px;
        width: 31px;
        opacity: 0.9;
        &:hover {
            opacity: 1;
        }
    }
    span {
        font-size: 0.875rem;
    }
    &:hover .list {
        display: flex;
        width: 150px;
        left: 0;
        &:before {
            left: 65%;
        }
    }
    ul {
        width: 100%;
        li {
            width: 100%;
        }
    }
    position: relative;
    @media screen and (max-width: 1023px) {
        display: none;
    }
`;
const List = styled.ul`
    display: none;
    list-style: none;
    margin: 0;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 4px;
    background: rgb(26, 28, 34);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
    width: 360px;
    flex-direction: row;
    flex-wrap: wrap;
    & li {
        text-align: center;
        line-height: 24px;
        font-size: 14px;
        width: calc(100% / 3);
        display: block;
        cursor: pointer;
        &:hover {
            background-color: #524d4d;
        }
        a,
        span {
            text-decoration: none;
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 0;
        }
    }
    & &:after {
        content: '';
        width: 100%;
        height: 10px;
        background-color: transparent;
        top: -10px;
        position: absolute;
        right: 0;
        z-index: -2;
    }
    &:before {
        display: block;
        box-sizing: border-box;
        content: '';
        height: 12px;
        width: 12px;
        position: absolute;
        z-index: -1;
        top: -1px;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: rgb(26, 28, 34);
        border-left: 1 px solid rgba(255, 255, 255, 0.25);
        border-top: 1 px solid rgba(255, 255, 255, 0.25);
        border-radius: 4px 0px 0px;
        border: 1px solid rgba(255, 255, 255, 0.25);
    }
`;
