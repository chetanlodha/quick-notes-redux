import './styles.css';

export default function Button(props) {
    return (
        <button className={`button ${props.class}`} onClick={props.onClick}>
            <span>
                {props.value}
            </span>
        </button>
    )
}