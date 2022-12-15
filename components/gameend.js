import Image from 'next/image'
import styles from '../styles/Home.module.css'

const imageLoader = ({ src }) =>
{
    return src;
}

const Gameend = ({winlose}) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <img src={"https://static.wikia.nocookie.net/shingekinokyojin/images/f/f0/Levi_Ackermann_%28Anime%29_character_image_%28850%29.png/revision/latest?cb=20210124214225"}
                style={{
                    border: '2px solid lime', borderRadius: 10,
                }}
            />
            <h2>{winlose.character.name}</h2>
            <h3 style={{textTransform: 'uppercase', margin: 0}}>Anime they are in</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 300}}>
                {
                    winlose.character.animes.slice(0, 3).map((item, index) =>
                    {
                        return (
                            <p key={index}
                                style={{
                                    border: '2px solid lime', borderRadius: 10,
                                    fontSize: 12, padding: 10, margin: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                {item}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Gameend;