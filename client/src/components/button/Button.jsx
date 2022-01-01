import { memo } from 'react';
import styled from 'styled-components';

const Button = (props) => {
    return <Links {...props}>{props.children}</Links>;
};
const Links = styled.button`
    display: inline-block;
    border: 4px solid transparent;
    color: var(--white);
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
`;
export default memo(Button);
