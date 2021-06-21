import './styles.css';

export default function Input({ showLabel = false, className, name, type, value, placeholder, accept = null, onChange = null, reference = null, required = null, multiple = null }) {
    return (
        <div className={`form-group ${className} position-relative w-100`}>
            {
                showLabel && <label className="label ml-2 mb-0" htmlFor={name}>{name}</label>
            }
            <input className="form-control px-3 py-4" type={type} name={name} placeholder={placeholder} onChange={onChange} value={value}
                accept={accept} ref={reference} required={required} multiple={multiple} />
        </div>
    )
}