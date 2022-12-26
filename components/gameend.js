import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const imageLoader = ({ src }) =>
{
    return src;
}

const Gameend = ({winlose, minWidth}) => {

    const [len, setLen] = useState(3);

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
            {/* <h3 style={{textTransform: 'uppercase', margin: 0}}>Anime they are in</h3> */}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 250, maxHeight: 150, overflow: 'auto'}}>
                {
                    winlose.character.animes.slice(0, len).map((item, index) =>
                    {
                        return (
                            <p key={index}
                                style={{
                                    border: `2px solid ${winlose.failed ? 'red' : 'lime'}`, borderRadius: 10,
                                    fontSize: 12, padding: 10, margin: 10, textAlign: 'center',
                                    fontWeight: 'bold', alignSelf: 'center', backgroundColor: winlose.failed ? 'red' : 'lime', color: 'black'
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