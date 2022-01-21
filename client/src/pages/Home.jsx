import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovies } from '../redux/movieRedux/apiCalls';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BannerSlide from '../components/BannerSlide';
import ListMovie from '../components/ListMovie';

export default function Home() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        getMovies(dispatch);
        window.scrollTo(0, 0);
    }, [slug, dispatch]);
    const movies = useSelector((state) => state.movie?.movies);
    const movies1 = movies.filter((m) => m.trending === 1);
    const auMy = movies.filter((m) => m.country === 'Âu Mỹ').reverse();
    const phimLe = movies.filter((m) => !m.isSeries);
    return (
        <div>
            <BannerSlide movies={movies1} />
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> Đề Xuất </h2>
                <ListMovie movies={movies1} />
            </div>
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> Âu Mỹ </h2>
                <ListMovie movies={auMy} />
            </div>
            <div className="container">
                <h2 style={{ marginBottom: '10px' }}> Phim Lẻ </h2>
                <ListMovie movies={phimLe} />
            </div>
        </div>
    );
}

// export default function Home() {
//     const [file, setFile] = useState(null);
//     const open = async () => {
//         try {
//             const result = await fetch('http://localhost:3000/videos/test.mp4');
//             const blob = await result.blob();
//             setFile(URL.createObjectURL(blob));
//         } catch (err) {}
//     };
//     useEffect(() => {
//         open();
//     }, []);
//     return (
//         <div className="home">
//             <Player
//                 playsInline
//                 poster="https://img1.kakaocdn.net/thumb/R1280x0/?fname=https://img.phimchill.tv/images/info/bright-as-the-moon.jpg"
//                 src={file}
//             />
//             {/* <input id="contained-button-file" type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
//             <button>Click</button>
//         </div>
//     );
// }
