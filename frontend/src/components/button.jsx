export default function Button({children, buttonClick}) {
    return(
        <button onClick={buttonClick} className='btn'>{children}</button>
    )
}