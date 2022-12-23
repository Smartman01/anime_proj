import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const Popup = ({title, close, children, minWidth, getDate}) =>
{
    const [time, setTime] = useState(getDate());

    var interval = setInterval(() => setTime(getDate()), 1000);

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'start',
            alignItems: 'center', padding: 10,
            width: minWidth !== null ? '300px' : '500px', borderRadius: 50, backgroundColor: "#212121",
            boxShadow: "15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)"
        }}>
            <h1 style={{
                    textTransform: 'uppercase', textAlign: 'center',
                    color: title.includes("Correct") ? 'lime' : title.includes("Wrong") ? 'red' : 'white',
                    fontSize: minWidth !== null ? 25 : null,
                }}
            >
                {title}
            </h1>
            <h3 style={{margin: 0, marginBottom: 20}}>Next character in: {time}</h3>
            {children}
            <button className={styles.card}
                style={{backgroundColor: 'transparent', fontWeight: 'bold', border: `2px solid red`, padding: 10}}
                onClick={() => {
                    clearInterval(interval);
                    close();
                }}
            >
                CLOSE
            </button>
        </div>
    );
}

export default Popup;