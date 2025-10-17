export default function ComboBox({id, name, values, onChange}){

    const noContent = values.length === 0 || !values

    return(
        <select id={id} name={name} onChange={onChange}>
            {noContent ? (
                <option disabled value="">
                    --- No hay opciones disponibles ---
                </option>
            )
            : (
                values.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.value}
                    </option>
                ))
            )}
        </select>
    )
}