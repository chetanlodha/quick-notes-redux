import './styles.css';

const Textarea = ({ className, name, rows, columns, value, placeholder, onChange = null, reference = null, required = null, showLabel = false }) => {
    return (
        <div className={`form-group ${className} position-relative w-100`}>
            {
                showLabel && <label className="label ml-2 mb-0" htmlFor={name}>{name}</label>
            }
            <textarea className="form-control px-3 pt-3" name={name} rows={rows} columns={columns} placeholder={placeholder} onChange={onChange}
                value={value} ref={reference} required={required} />
        </div>
    )
}

export default Textarea