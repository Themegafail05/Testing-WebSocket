import ComboBox from '../../Utils/Components/ComboBox'
import Button from '../../Utils/Components/Button'
import Input from '../../Utils/Components/Input'
import useWebSocket from './Hooks/useWebSockets'
import './Css/WebSockets.css';

export default function WebSocket(){

    const {
        isConnected,
        connect,
        disconnect,
        ObtenerImpresoras,
        listImpresoras,
        setImpresora,
        impresora,
        SeleccionarDocumento,
        archivo,
        ImprimirDocumento
    } = useWebSocket()

    return(
        <div className='container'>

            <Button
                id={'connect'}
                name={'connect'}
                title={!isConnected ? 'Conectar' : 'Desconectar'}
                onClick={!isConnected ? connect : disconnect}
            />

            <ComboBox
                id={'printers'}
                name={'printers'}
                values={listImpresoras}
                onChange={(e) => setImpresora(e.target.options[e.target.selectedIndex].text)}
            />

            <Button
                id={'getprinters'}
                name={'getprinters'}
                title={'Obtener Impresoras'}
                disabled={!isConnected}
                onClick={ObtenerImpresoras}
            />

            <h3>Impresora Actual: {impresora}</h3>

            <Input
                type={'file'}
                accept={'application/pdf'}
                onChange={SeleccionarDocumento}
                disabled={impresora === null}
            />

            <Button
                id={'printdocument'}
                name={'printdocument'}
                title={'Imprimir Documento'}
                disabled={archivo === null}
                onClick={ImprimirDocumento}
            />


        </div>
    )
}