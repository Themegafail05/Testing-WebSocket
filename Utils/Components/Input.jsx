export default function Input({type,accept,onChange,disabled}){

    return(
        <input
            type={type}
            accept={accept}
            onChange={onChange}
            disabled={disabled}
        />
    )
}