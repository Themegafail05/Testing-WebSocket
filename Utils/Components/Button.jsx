export default function Button({ type = "button", id, className, disabled = false, name, title, onClick }) {
    return (
        <button
            id={id}
            name={name}
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={className}
            title={title}
        >
            {title}
        </button>
    );
}
