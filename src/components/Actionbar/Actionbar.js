import './styles.css'

const Actionbar = ({ className = '', children }) => {
    return (
        <div className={`actionBar ${className}`}>
            {children}
        </div>
    )
}

export default Actionbar