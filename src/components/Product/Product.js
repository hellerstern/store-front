import styled from "styled-components";

import { Link } from "react-router-dom";

export const Product = ( { props } ) => {
    return (
        <Wrapper to={props.url}>
            <img src={props.image}></img>
        </Wrapper>
    )
}

const Wrapper = styled(Link)`
    width: 300px;
    height: 300px;
    img {
        width: 100%;
        height: 100%;
    }
    border: 1px solid lightgrey;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    overflow: hidden;
    &:hover {
        img {
            transition: all .3s;
            transform: scale(1.1);
        }
    }
`