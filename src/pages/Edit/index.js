import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoMdSwap } from 'react-icons/io';
import 'react-notifications/lib/notifications.css';

import { USERS } from "../../constants";
import { Header } from "../../components/Header/Header";
import { encryptData } from "../Show";

export const Edit = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [FBFlag, setFBFlag] = useState(false);
    const [copiedURL, setCopiedURL] = useState(null);

    const handleUserChange = (e) => {
        setUserInfo(e.target.value == 'null' ? null : JSON.parse(e.target.value))
    }

    const copyRef = useRef(null);
    return (
        <Wrapper>
            <NotificationContainer/>
            <Header />
            <Container>
                <EditDiv>
                    <CardFront flag = { FBFlag }>
                        <div className="front-left">
                            <p className="company-name">
                                {'Name: ' + userInfo?.name ?? 'Name'}
                            </p>
                            <p className="title-name">
                                {'Title: ' + userInfo?.title ?? 'Title'}
                            </p>
                        </div>
                        <div className="front-right">
                            <img src={userInfo?.image}></img>
                        </div>
                    </CardFront>
                    <CardBack flag = { FBFlag }>
                        <p>
                            {
                                'gmail: ' + userInfo?.email ?? 'email'
                            }
                        </p>
                        <p>
                            {
                                'Company: ' + userInfo?.company ?? 'company'
                            }
                        </p>
                    </CardBack>
                    <p className="fbflag">
                        {
                            !FBFlag ? 'Front' : 'Back'
                        }
                    </p>
                </EditDiv>
                <ToolDiv>
                    <button onClick={() => setFBFlag(!FBFlag)}><IoMdSwap></IoMdSwap></button>
                    <br></br>
                    <select onChange={handleUserChange} className='user-selector'>
                        <option value={'null'}>None</option>
                        {
                            USERS.map((item, index) => (    
                                <option value={JSON.stringify(item)} key={index}>{item.name}</option>
                            ))
                        }
                    </select>
                    <button className='get-link' style={{ display: userInfo ? 'block' : 'none'}}
                        onClick={() => {
                            setCopiedURL(window.location.protocol + '//' + window.location.host + "/show?get=" + encryptData(userInfo?.key));
                            NotificationManager.success('Copied', 'Result');
                            copyRef.current.onClick();
                        }}
                    >Get Link</button>
                    <CopyToClipboard text={copiedURL} style={{display: 'none'}} ref={copyRef}>
                        <span>Copy to clipboard with span</span>
                    </CopyToClipboard>
                </ToolDiv>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
`

const Container = styled.div`
    max-width: ${p => p.theme.maxWidth };
    margin: auto;
    display: flex;
    margin-top: 50px;
`

const EditDiv = styled.div`
    max-width: 80%;
    min-width: 80%;
    height: 70vh;
    position: relative;
    .fbflag {
        position: absolute;
        top: 10px;
        right: 10px;
        font-weight: bold;
    }
`

const ToolDiv = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    button {
        padding: 10px;
        svg {
            transform: scale(1.5);
        }
    }
    .user-selector {
        padding: 10px;
    }
    .get-link {
        margin-top: 20px;
    }
`

const CardFront = styled.div`
    position: absolute;
    width: ${p => p.theme.cardWidth};
    height: ${p => p.theme.cardHeight};
    background-color: black;
    display: flex;
    justify-content: space-around;
    top: ${p => `calc(${!p.flag ? '50%' : '90%'} - ${p.theme.cardHeight})`};
    transform: scale(${p => !p.flag ? '1' : p.theme.cardScale});
    right: ${p => `calc(50% - ${p.theme.cardWidth}/2)`};
    border-radius: 10px;
    transition: all .3s;
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

const CardBack = styled.div`
    position: absolute;
    width: 350px;
    height: 180px;
    /* background-color: #9BB2A2; */
    background-color: black;
    display: flex;
    justify-content: space-around;
    right: calc(50% - 175px);
    border-radius: 10px;
    top: ${p => `calc(${p.flag ? '50%' : '90%'} - ${p.theme.cardHeight})`};
    transform: scale(${p => p.flag ? '1' : p.theme.cardScale});
    transition: all .3s;
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