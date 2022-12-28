import styled from "styled-components";

export const Header = () => {
    return (
        <Wrapper>
            <Container>
                <p>
                    StoreFront
                </p>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    background-color: ${p => p.theme.headerBgColor };
    padding: 20px;
`
const Container = styled.div`
    max-width: ${p => p.theme.maxWidth};
    margin: auto;
    p {
        color: white;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 2px;
    }
    text-align: center;
`