import Header from '../components/Header'
import Button from '../components/button'
import { useState } from 'react'

function Welcome () {
    const [value, setValue] = useState("click the button")
    
    function handleClick() {
    console.log("clicked")
    setValue(type)
    }
    
    return (
        <>
        <Header />
        <Button buttonClick={handleClick}>Button 1</Button>
        <Button buttonClick={handleClick}>Button 2</Button>
        <h1>{value}</h1>
        </>
    )
}

export default Welcome