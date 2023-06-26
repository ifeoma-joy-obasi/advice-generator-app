import React, {useState, useEffect} from 'react'
import patternDividerMobile from '../images/pattern-divider-mobile.svg'
import patternDividerDesktop from '../images/pattern-divider-desktop.svg'
import iconDice from '../images/icon-dice.svg'
const Advice = () => {
//javascript
let [adviceData, setAdviceData] = useState({});

let [adviceInfo, setAdviceInfo] = useState({
    advice: ''
})

let [count, setCount] = useState(0)


useEffect(()=>{
let iscancelled = false;
fetch('https://api.adviceslip.com/advice')
.then(response => response.json())
.then(data => {
    if(!iscancelled){
        setAdviceData(data)
    }
})

//clean up function
return ()=>{
    iscancelled = true;
}

},[count])


const renderAdivice = (e) =>{

setCount(prevCount => prevCount + 1)

setAdviceInfo(prevAdvice=>({
    ...prevAdvice,
    id: adviceData.slip.id,
    advice: adviceData.slip.advice,
}))

}


    return (
    <div className='overall-container'>
        
        <p className='individual-advice-id'>ADVICE #<span>{adviceInfo.id || 117}</span></p>
        
        <q className="random-advice">
        {adviceInfo.advice || 
        'it is easy to sit up and take notice, whats difficult is getting up and taking action.'}
        </q>
        
        <div className="img-container">
                <picture>
                <source media="(min-width: 40em)" srcSet={patternDividerDesktop} />
                <img src={patternDividerMobile} alt="pattern divider"  />
            </picture>
        </div>
        <button type='submit'
        onClick={renderAdivice}
        className='btn'
        >
        <img src={iconDice} alt="icon dice" className='diceicon'/>
        </button>
    </div>
    )
}

export default Advice
