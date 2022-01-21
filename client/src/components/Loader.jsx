import { memo } from 'react';
import styled from 'styled-components';

const Loader = (props) => {
    return (
        <LoaderBox className={props.className}>
            <div></div>
            <div></div>
        </LoaderBox>
    );
};
const LoaderBox = styled.div`
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    top: calc(50% - 30px);
    right: calc(50% - 30px);
    display: inline-block;
    vertical-align: middle;
    & > div:nth-child(1) {
        position: absolute;
        border: 4px solid #00f525;
        border-left-color: transparent;
        border-bottom: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        -webkit-animation: loaderOutter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
        animation: loaderOutter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
    }
    & > div:nth-child(2) {
        position: absolute;
        border: 4px solid #00f525;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        left: calc(50% - 20px);
        top: calc(50% - 20px);
        border-right: 0;
        border-top-color: transparent;
        -webkit-animation: loaderInner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
        animation: loaderInner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
    }
    @-webkit-keyframes loaderOutter {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes loaderOutter {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loaderInner {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }

    @keyframes loaderInner {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }
`;
export default memo(Loader);
