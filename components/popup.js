import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Popup = ({title, close, children}) => {
    return (
        <div style={{
            backgroundColor: '#5a5858', color: 'white', width: '500px',
            borderRadius: '10px', border: '2px solid white',
            display: 'flex', flexDirection: 'column', justifyContent: 'start',
            alignItems: 'center', padding: 10
        }}>
            <h1 style={{textTransform: 'uppercase'}}>{title}</h1>
            {children}
            <button className={styles.card}
                style={{backgroundColor: 'transparent', fontWeight: 'bold', border: `2px solid ${title.includes("Correct") ? 'lime' : 'red'}`}}
                onClick={() => close()}
            >
                CLOSE
            </button>
        </div>
    );
}

export default Popup;