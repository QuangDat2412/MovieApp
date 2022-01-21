/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
export default function Footer(props) {
    return (
        <>
            <Container>
                <div></div>
                <div>
                    <div>
                        <h1>Giới thiệu về chúng tôi</h1>
                        <Link to="/">Thông tin công ty</Link>
                        <Link to="/">Giới thiệu dịch vụ</Link>
                    </div>
                    <div>
                        <h1>Hợp tác</h1>
                        <Link to="/">Đăng quảng cáo</Link>
                        <Link to="/">Quan hệ kinh doanh</Link>
                    </div>
                    <div>
                        <h1>Hỗ trợ và giúp đỡ</h1>
                        <Link to="/">Phản ánh ý kiến</Link>
                        <Link to="/">Câu hỏi thường gặp</Link>
                    </div>
                    <div>
                        <h1>Điều khoản dịch vụ</h1>
                        <Link to="/">Điều khoản quyền riêng tư</Link>
                        <Link to="/">Điều khoản sử dụng</Link>
                    </div>
                </div>
                <div>
                    <h1>Copyright © 2021 CuCu All Rights Reserved</h1>
                    <div>
                        <a href="https://www.facebook.com/qdat99" target="blank">
                            <FacebookIcon />
                        </a>
                        <a href="https://www.instagram.com/ledat2412/" target="blank">
                            <InstagramIcon />
                        </a>
                        <a href="https://www.youtube.com/" target="blank">
                            <YouTubeIcon />
                        </a>
                    </div>
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: 300px;
    background-color: #1a1a1a;
    padding: 2rem 20rem;
    margin: 0;

    h1,
    a {
        display: block;
        font-size: 1rem;
        line-height: 3rem;
    }
    a {
        opacity: 0.8;
        &:hover {
            color: var(--primary-color);
        }
    }
    & > div:nth-child(1) {
        width: 100%;
        height: 1px;
        background: rgb(255, 255, 255);
        opacity: 0.5;
    }
    & > div:nth-child(2) {
        display: flex;
        & > div {
            margin-top: 1rem;
            width: calc(100% / 4);
        }
    }
    & > div:nth-child(3) {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        & > div {
            display: flex;
            & > a {
                margin: 0 10px;
            }
        }
    }
`;
