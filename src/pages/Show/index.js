import { useEffect, useState } from "react";
import styled from "styled-components";
import CryptoJS from "crypto-js";

import { USERS } from "../../constants";
import { Header } from "../../components/Header/Header";

// You need this kind of value on env file...
const secretPass = "XkhZG4fW2t2W";

export const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        secretPass
    ).toString();
    return data;
};

export const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};


export const Show = () => {
    const [pageFlag, setPageFlag] = useState(true);
    const [userFlag, setUserFlag] = useState(null);
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const get = queryParameters.get('get');
        let key;
        try {
            key = decryptData(get.replace(/\s/g, '+'));
        } catch(err) {
            if (err) {
                console.log(err);
                console.log(key);
                setPageFlag(false);
            } else {
                console.log('I am here');
            }
        }
        console.log(key);
        if (USERS.filter(item => item.key == key).length == 0) {
            setPageFlag(false);
        } else {
            setPageFlag(true);
            setUserFlag(USERS[key]);
        }
    }, [])
    return (
        <Wrapper>
            {
                !pageFlag ? (
                    <h1 className="something">Something Wrong</h1>
                ) : (
                    <>
                        <Header></Header>
                        <Container>
                            <Front>
                                <div className="front-left">
                                    <p className="company-name">
                                        {'Name: ' + userFlag?.name ?? 'Name'}
                                    </p>
                                    <p className="title-name">
                                        {'title: ' + userFlag?.title ?? 'Title'}
                                    </p>
                                </div>
                                <div className="front-right">
                                    <img src={userFlag?.image}></img>
                                </div>
                            </Front>
                            <Back>
                                <p>
                                    {
                                        'email: '+userFlag?.email ?? 'email'
                                    }
                                </p>
                                <p>
                                    {
                                        'company: '+userFlag?.company ?? 'company'
                                    }
                                </p>
                            </Back>
                        </Container>
                    </>
                )
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .something {
        text-align: center;
    }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 50px;
`

const Front = styled.div`
    width: ${p => p.theme.cardWidth};
    height: ${p => p.theme.cardHeight};
    background-color: black;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    .front-left {
        display: flex;
        flex-direction: column;
        justify-content: end;
        margin-bottom: 20px;
        color: white;
        width: 60%;
        padding: 10px;
        .company-name {
            font-size: 20px;
            font-weight: bold;
        }
        .title-name {
            font-size: 15px;
            font-weight: bold;
        }
    }
    .front-right {
        width: 30%;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-top: 20px;
        }
    }
`

const Back = styled.div`
    width: 350px;
    height: 180px;
    background-color: black;
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    p {
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
`