import Image from 'next/image'

const Help = () => {
    return (
        <div>
            <ol type='1' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',}}>
                <li style={{marginBottom: 10}}>Look through the character's characteristics and make an guess based on those values. As you type in the search bar sugesstions will appear.</li>
                <Image style={{transform: 'translate(20px, 0px)', borderRadius: 10, border: '2px solid red'}} src='/images/search.png' width={200/0.566666667} height='200'/>
                <li style={{marginBottom: 10, marginTop: 10}}>If guessed incorrectly the incorrect name will display and the number of guesses will decrease; as shown below.</li>
                <Image style={{transform: 'translate(20px, 0px)', borderRadius: 10, border: '2px solid red'}} src='/images/incorrect.png' width={120/0.3448} height='120'/>
            </ol>
        </div>
    );
}

export default Help;