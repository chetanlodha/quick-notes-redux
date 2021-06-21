import './styles.css'

const Response = ({response}) => {
    return (
        <div className={`response ${response.isVisible ? 'visible' : ''} ${response.success ? 'success' : 'failed'} mx-auto 
        rounded-lg px-4 py-3 success`}>
            <h6 className={`text ${response.success ? 'success' : 'failed'} mb-0`}>{response.text}</h6>
        </div>
    )
}

export default Response