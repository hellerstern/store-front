import React from "react";
import styled from "styled-components";
import { Header } from "../../components/Header/Header";
import { Product } from "../../components/Product/Product";

import { KINDOFPRODUCTS } from "../../constants";

export const Landing = () => {
    return (
        <Wrapper>
            <Header></Header>
            <Container>
                <div className="title">
                    <p>
                        Our products
                    </p>
                </div>
                <div className="products">
                    {
                        KINDOFPRODUCTS.map((item, index) => (
                            <Product props={item} key={index} />
                        ))
                    }
                </div>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
`

const Container = styled.div`
    max-width: ${p => p.theme.maxWidth};
    margin: auto;
    .title {
        text-align: center;
        padding: 30px;
        font-size: 40px;
        border-bottom: 1px solid grey;
    }
    .products {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        margin-top: 30px;
    }
`