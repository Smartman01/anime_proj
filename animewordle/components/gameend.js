import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share"

const Gameend = ({winlose, minWidth, guesses}) => {
    const [len, setLen] = useState(3);
    const url = window.location.href;
    const title = `Guessed ${winlose.character.name} in ${guesses} ${guesses > 1 ? "tries" : 'try'}`;

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img src={`data:image/png;base64,${winlose.character.image}`}
                style={{
                    border: `2px solid ${winlose.failed ? 'red' : 'lime'}`, borderRadius: 10,
                    width: minWidth !== null ? '125px' : 175
                }}
            />
            <h2>{winlose.character.name}</h2>
            <div style={{display: 'flex', margin: 5, marginBottom: 10}}>
                <TwitterShareButton
                    url={url}
                    title={title}
                    style={{marginRight: 10}}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                    url={url}
                    title={title}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 250, maxHeight: 150, overflow: 'auto'}}>
                {
                    winlose.character.animes.slice(0, len).map((item, index) =>
                    {
                        return (
                            <p key={index}
                                style={{
                                    border: `2px solid ${winlose.failed ? 'red' : 'lime'}`, borderRadius: 10,
                                    fontSize: 12, padding: 10, margin: 10, textAlign: 'center',
                                    fontWeight: 'bold', alignSelf: 'center', backgroundColor: winlose.failed ? 'red' : 'lime',
                                    color: winlose.failed ? 'white' : 'black'
                                }}
                            >
                                {item}
                            </p>
                        )
                    })
                }
                <button className={styles.card}
                    style={{
                        backgroundColor: 'transparent', padding: 10,
                        border: `2px solid ${winlose.failed ? 'red' : 'lime'}`, fontWeight: 'bold',
                        display: len === winlose.character.animes.length ? 'none' : null
                    }}
                    onClick={() => setLen(winlose.character.animes.length)}
                >
                    more...
                </button>
            </div>
        </div>
    );
}

export default Gameend;