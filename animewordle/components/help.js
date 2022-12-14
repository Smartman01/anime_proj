import Image from 'next/image'

const Help = ({minWidth}) => {
    return (
        <div>
            <ol type='1' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: minWidth ? 'center' : 'start'}}>
                <li style={{marginBottom: 10, maxWidth: minWidth ? 225 : null}}>Look through the character's characteristics and make an guess based on those values. As you type in the search bar sugesstions will appear.</li>
                <Image style={{transform: `translate(${minWidth ? -20 : 20}px, 0px)`, borderRadius: 10, border: '2px solid red'}} src='/images/search.png' width={200/(minWidth ? 1 : 0.566666667)} height={200*(minWidth ? 0.566666667 : 1)}/>
                <li style={{marginBottom: 10, marginTop: 10, maxWidth: minWidth ? 225 : null}}>If guessed incorrectly the incorrect name will display and the number of guesses will decrease; as shown below.</li>
                <Image style={{transform: `translate(${minWidth ? -20 : 20}px, 0px)`, borderRadius: 10, border: '2px solid red'}} src='/images/incorrect.png' width={minWidth ? 220 : 120/0.3448} height={minWidth ? 220*0.3448 : 120}/>
            </ol>
        </div>
    );
}

export default Help;