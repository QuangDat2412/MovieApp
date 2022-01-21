import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import ListEpisode from '../components/ListEpisode.jsx';

const Search = () => {
    const { slug } = useParams();
    const location = useLocation();
    const data = location.state?.data ? location.state?.data : [];
    const value = location.state?.value ? location.state?.value : '';
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);
    const string = 'Từ khóa tìm kiếm: ' + value;
    return (
        <Container>
            <ListEpisode movies={data} string={string} />
        </Container>
    );
};
const Container = styled.div`
    margin-top: 100px;
`;

export default Search;
