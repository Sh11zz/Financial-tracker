function Button({children, buttonClick}) {
    return(
        <button onClick={buttonClick}>{children}</button>
    )
}

export default Button