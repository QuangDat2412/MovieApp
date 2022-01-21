/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { publicRequest, userRequest } from '../requestMethods';
import { updateUserSuccess } from '../redux/authRedux/authRedux';
import { useDispatch } from 'react-redux';
import Stripe from './Stripe';
import { formatTime } from '../utils';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward5Icon from '@material-ui/icons/Forward5';
import Replay5Icon from '@material-ui/icons/Replay5';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Loader from './Loader';
const VideoBox = (props) => {
    const slug = useParams();
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);
    const [ads, setAds] = useState(false);
    const [p, setP] = useState('360p');
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [left, setLeft] = useState(0);
    const [file, setFile] = useState(null);
    const [link, setLink] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [vol, setVol] = useState(50);
    const [overTime, setOverTime] = useState(0);
    const video = useRef();
    const progress = useRef();
    const volume = useRef();
    const timeId = useRef();
    const fullScreen = useRef(false);
    const controller = new AbortController();
    const { signal } = controller;
    const getEpisode = async (p) => {
        try {
            const res = await publicRequest.get('/episodes/episode/' + props.episode._id);
            const result = await fetch(
                'https://www.googleapis.com/drive/v3/files/' + res.data[p] + '?alt=media&key=AIzaSyCIa8iyfyYCpCEvjxuYZyfCJ6SGHmEAsxo',
                { signal }
            );
            // const result = await fetch('http://localhost:3000/test.mp4', { signal });
            const blob = await result.blob();
            setLink(URL.createObjectURL(blob));
            setFile('/ads.mp4');
        } catch (err) {
            setP('480p');
            console.log(err);
        }
    };
    useEffect(() => {
        pauseVideo();
        setStart(false);
        setAds(false);
        setFile(null);
        getEpisode(p);
        return () => {
            controller.abort();
        };
    }, [slug, p]);
    useEffect(() => {
        video.current.ontimeupdate = () => {
            if (undefined !== progress.current && video.current?.duration) {
                const progressPercent = Math.round((video.current.currentTime / video.current?.duration) * 5000);
                if (progress.current) {
                    progress.current.value = progressPercent;
                }
                setCurrentTime(formatTime(video.current.currentTime));
            }
            if (!ads) {
                setCurrentTime(formatTime(parseInt(video.current.duration.toFixed(0)) - video.current.currentTime));
            }
        };
        const logKey = (e) => {
            const keyCode = e.keyCode;
            switch (keyCode) {
                case 32: //pause/play
                    if (video.current.paused === false) {
                        pauseVideo();
                    } else {
                        playVideo();
                    }
                    break;
                case 77: //mute/unmute
                    if (video.current.muted === true) {
                        unMutedVolume();
                    } else {
                        mutedVolume();
                    }
                    break;
                case 39: //forward5
                    forward5();
                    break;
                case 37: //replay5
                    replay5();
                    break;
                case 70: //fullscreen
                    if (fullScreen.current) {
                        closeFullScreen();
                    } else {
                        openFullscreen();
                    }
                    break;
                case 27: //fullscreen
                    if (fullScreen.current) {
                        fullScreen.current = false;
                    }
                    break;
                default:
                // code block
            }
        };
        document.addEventListener('keyup', logKey);
        return () => {
            document.removeEventListener('keyup', logKey);
        };
    }, [ads]);
    const timeLapse = (e) => {
        // từ số phần trăm của giây convert sang giây
        video.current.currentTime = overTime;
        playVideo();
        setCurrentTime(formatTime(video.current.currentTime));
    };
    const handleVolume = (e) => {
        video.current.volume = (e.target.value / 100).toFixed(1);
        setMute(false);
        if (e.target.value === '0') {
            setMute(true);
        }
        setVol(e.target.value);
    };

    const replay5 = () => {
        video.current.currentTime = video.current.currentTime - 5;
        playVideo();
    };
    const forward5 = () => {
        video.current.currentTime = video.current.currentTime + 5;
        playVideo();
    };
    const playVideo = () => {
        video.current && video.current.play();
        setPlay(true);
    };
    const pauseVideo = () => {
        video.current && video.current.pause();
        setPlay(false);
    };
    const mutedVolume = () => {
        if (undefined !== volume.current) {
            volume.current.value = 0;
            video.current.muted = true;
            video.current.volume = 0;
            setVol(0);
            setMute(true);
        }
    };
    const unMutedVolume = () => {
        if (undefined !== volume.current) {
            volume.current.value = 50;
            video.current.muted = false;
            video.current.volume = 0.5;
            setVol(50);
            setMute(false);
        }
    };
    const openFullscreen = () => {
        fullScreen.current = true;
        if (video.current.parentElement.requestFullscreen) {
            video.current.parentElement.requestFullscreen();
        } else if (video.current.parentElement.webkitRequestFullscreen) {
            /* Safari */
            video.current.parentElement.webkitRequestFullscreen();
        } else if (video.current.parentElement.msRequestFullscreen) {
            /* IE11 */
            video.current.parentElement.msRequestFullscreen();
        }
    };
    const closeFullScreen = () => {
        fullScreen.current = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    };
    const handlePlayMovie = async () => {
        setStart(true);
        const time = parseInt((video.current.duration * 1000).toFixed(0));
        if (props.auth?.isVip) {
            await setFile(link);
            setAds(true);
        } else {
            setTimeout(() => {
                setFile(link);
                playVideo();
                setAds(true);
            }, time);
        }
        playVideo();
        if (props.auth?._id) {
            const res = await userRequest.put(`/users/add/${props.auth?._id}`, { history: props.episode._id });
            dispatch(updateUserSuccess(res.data));
        } else {
            const history = JSON.parse(sessionStorage.getItem(process.env.REACT_APP_SESSION_KEY)) || {
                history: [],
            };
            sessionStorage.setItem(process.env.REACT_APP_SESSION_KEY, JSON.stringify({ history: [...history.history, props.episode._id] }));
        }
    };
    return (
        <Video
            onMouseMove={() => {
                document.getElementById('control')?.classList.add('control');
                clearTimeout(timeId.current);
                timeId.current = setTimeout(() => {
                    document.getElementById('control')?.classList.remove('control');
                }, 5000);
            }}
        >
            <div>
                <div>
                    <div
                        style={{
                            zIndex: `${start ? 0 : ''}`,
                            backgroundImage: `url(${start ? 'https://www.iqiyipic.com/lequ/20211125/player-back.png' : props.movie?.imgBanner})`,
                        }}
                    >
                        {!start && file && (
                            <>
                                {props.auth?.isVip || !props.movie?.isVip || (props.episode?.episode <= 4 && props.movie?.isSeries) ? (
                                    <PlayCircleOutlineIcon onClick={handlePlayMovie} />
                                ) : (
                                    <div className="no_vip">
                                        <div>
                                            Nội dung VIP, kích hoạt VIP để xem
                                            {props.auth?.id ? (
                                                <Stripe>
                                                    <div>Kích hoạt VIP</div>
                                                </Stripe>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        props.setOpenModal(true);
                                                    }}
                                                >
                                                    Nếu bạn là VIP vui lòng đăng nhập
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {!file && <Loader />}
                    </div>
                    <div>
                        <video
                            ref={video}
                            src={file}
                            onClick={() => {
                                if (play) {
                                    pauseVideo();
                                } else {
                                    playVideo();
                                }
                            }}
                        />
                        {/* <source  type="video/mp4" />
                        </video> */}
                        {start && !ads && <div className="ads">{`Quảng cáo 1 trong tổng số 1 (${currentTime ? currentTime : '00:00'})`}</div>}
                        {start && ads && (
                            <ControlVideo id="control">
                                <div>
                                    <input
                                        type="range"
                                        defaultValue="0"
                                        step="1"
                                        min="0"
                                        max="5000"
                                        ref={progress}
                                        onInput={timeLapse}
                                        onMouseMove={(e) => {
                                            const a = e.target.offsetWidth;
                                            const b = e.clientX - progress.current.getBoundingClientRect().left;
                                            setOverTime(((video.current.duration * b) / a).toFixed());
                                            setLeft(b);
                                        }}
                                        style={{ backgroundSize: `${(video.current.currentTime / video.current.duration) * 100}% 100%` }}
                                    />
                                    <h1 style={{ left: `${left - 15}px` }}>{formatTime(overTime)}</h1>
                                </div>
                                <div>
                                    <LeftControl>
                                        {play ? <PauseIcon onClick={pauseVideo} /> : <PlayArrowIcon onClick={playVideo} />}
                                        <Replay5Icon onClick={replay5} />
                                        <Forward5Icon onClick={forward5} />
                                        <SkipNextIcon />
                                        <TimeVideo>
                                            <span>{currentTime ? currentTime : '00:00'}</span>
                                            <span>/</span>
                                            <span>{video.current ? formatTime(video.current.duration) : '00:00'}</span>
                                        </TimeVideo>
                                    </LeftControl>
                                    <RightControl>
                                        <div>
                                            {p}
                                            <div>
                                                <div
                                                    onClick={() => {
                                                        setP('360p');
                                                    }}
                                                    style={{
                                                        color: `${`${p}` === '360p' ? 'var(--primary-color)' : ''}`,
                                                    }}
                                                >
                                                    360p
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setP('480p');
                                                    }}
                                                    style={{
                                                        color: `${`${p}` === '480p' ? 'var(--primary-color)' : ''}`,
                                                    }}
                                                >
                                                    480p
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setP('720p');
                                                    }}
                                                    style={{
                                                        color: `${`${p}` === '720p' ? 'var(--primary-color)' : ''}`,
                                                    }}
                                                >
                                                    720p
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setP('1080p');
                                                    }}
                                                    style={{
                                                        color: `${`${p}` === '1080p' ? 'var(--primary-color)' : ''}`,
                                                    }}
                                                >
                                                    1080p
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {mute ? <VolumeOffIcon onClick={unMutedVolume} /> : <VolumeUpIcon onClick={mutedVolume} />}
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                defaultValue="50"
                                                ref={volume}
                                                onInput={handleVolume}
                                                style={{ backgroundSize: `${vol ? vol : 0}% 100%` }}
                                            />
                                        </div>
                                        {fullScreen.current ? (
                                            <FullscreenExitIcon onClick={closeFullScreen} />
                                        ) : (
                                            <FullscreenIcon onClick={openFullscreen} />
                                        )}
                                    </RightControl>
                                </div>
                            </ControlVideo>
                        )}
                        {!file && <Loader />}
                    </div>
                </div>
            </div>
        </Video>
    );
};
const Video = styled.div`
    width: 75%;
    overflow: hidden;
    & > div {
        width: 100%;
        position: relative;
        &:before {
            padding-top: 56.25%;
            content: '';
            display: block;
        }
        & > div {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            video {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }
            & > div:nth-child(1) {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                z-index: 3000;
                background-repeat: no-repeat;
                background-size: 100%;
                & > svg {
                    position: absolute;
                    top: calc(50% - 50px);
                    right: calc(50% - 30px);
                    width: 60px;
                    height: 60px;
                    cursor: pointer;
                }
                .no_vip {
                    width: 100%;
                    height: 100%;
                    background-image: url(https://www.iqiyipic.com/lequ/20211125/player-back.png);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > div {
                        text-align: center;
                        span {
                            width: 75%;
                            margin: 20px auto;
                            display: block;
                            div {
                                line-height: 1.25;
                                font-size: 1rem;
                                color: #000;
                                background-color: rgb(242, 191, 131);
                                width: 100%;
                                display: inline-block;
                                padding: 0.5rem;
                                text-align: center;
                                border-radius: 5px;
                                cursor: pointer;
                            }
                        }
                        & > div {
                            font-size: 0.8rem;
                            color: var(--primary-color);
                            text-align: center;
                            margin-top: 20px;
                            cursor: pointer;
                        }
                    }
                }
            }
            & > div:nth-child(2) {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 2146;
                .ads {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    z-index: 2147;
                    font-weight: 600;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        width: calc(100% + 8rem);
        margin: 0 -4rem;
    }
    video::-webkit-media-controls {
        display: none !important;
    }
    .control {
        transition: transform 0.8s ease, opacity 1.5s ease;
        transform: translateY(-65px);
        opacity: 1;
    }
`;

const ControlVideo = styled.div`
    width: 100%;
    position: absolute;
    bottom: -55px;
    cursor: pointer;
    z-index: 2147;
    opacity: 0;
    transition: transform 0.8s ease, opacity 1.5s ease;
    transform: translateY(0px);
    input {
        -webkit-appearance: none;
        width: 100%;
        height: 5px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 5px;
        background-image: linear-gradient(var(--primary-color), var(--primary-color));
        background-repeat: no-repeat;
        cursor: pointer;
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: var(--white);
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
        }

        &::-moz-range-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: var(--white);
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
        }

        &::-ms-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: var(--white);
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
        }

        &::-webkit-slider-thumb:hover {
            background: #80ff00;
        }

        &::-moz-range-thumb:hover {
            background: #80ff00;
        }

        &::-ms-thumb:hover {
            background: #80ff00;
        }

        /* Input Track */
        &::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-moz-range-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }

        &::-ms-track {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }
        &:hover {
            height: 8px;
        }
    }
    & > div:nth-child(1) {
        margin-bottom: 10px;
        & > h1 {
            display: none;
            background-color: #111319;
            position: absolute;
            bottom: 4rem;
            padding: 5px;
            font-size: 0.8rem;
            border-radius: 5px;
            width: 60px;
            text-align: center;
            vertical-align: middle;
        }
        &:hover h1 {
            display: block;
        }
    }
    & > div {
        display: flex;
        svg {
            margin-left: 20px;
            &:hover {
                color: var(--primary-color);
            }
        }
    }
`;
const TimeVideo = styled.div`
    margin-left: 20px;
    & > span {
        font-size: 0.8rem;
        margin: 0 5px;
    }
`;

const LeftControl = styled.div`
    flex: 1;
    display: flex;
    & > svg:nth-child(1) {
        font-size: 2rem;
    }
    align-items: center;
`;
const RightControl = styled.div`
    display: flex;
    & > svg:nth-child(3) {
        margin-right: 20px;
    }
    & > div:nth-child(1) {
        position: relative;
        & > div {
            position: absolute;
            border-radius: 4px;
            background: rgb(26, 28, 34);
            border: 1px solid rgba(255, 255, 255, 0.25);
            bottom: 55px;
            width: 100px;
            right: -30px;
            display: none;
            & > div {
                width: 100%;
                text-align: center;
                padding: 10px 0;
                &:hover {
                    background-color: #524d4d;
                    color: var(--primary-color);
                }
            }
        }
        &:hover {
            & > div {
                display: block;
                opacity: 1;
                transition: opacity 0.8s ease;
            }
        }
        &:after {
            content: '';
            display: block;
            width: 25px;
            height: 40px;
            background-color: transparent;
            position: absolute;
            top: -25px;
            right: 0;
            transform: translateY(-10px);
        }
    }
    & > div:nth-child(2) {
        display: inline-block;
        position: relative;
        & > input {
            position: absolute;
            transform: rotate(270deg);
            bottom: 105px;
            left: -18px;
            width: 100px;
            border-radius: 10px;
            opacity: 0;
            transition: opacity 0.8s ease;
            &::-webkit-slider-runnable-track {
                border-radius: 10px;
            }
            &:hover {
                height: 8px;
            }
            display: none;
        }
        &:hover {
            & > input {
                display: block;
                opacity: 1;
                transition: opacity 0.8s ease;
            }
        }
        &:after {
            content: '';
            display: block;
            width: 25px;
            height: 40px;
            background-color: transparent;
            position: absolute;
            top: -25px;
            right: 0;
            transform: translateY(-10px);
        }
    }
`;
export default VideoBox;
