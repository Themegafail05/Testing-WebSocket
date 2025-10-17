import { useEffect, useRef, useState } from "react";
import {showSuccess,showError,showInfo,showWarning} from '../../../Utils/Toast/MessageToast'

export default function useWebSocket(){


    //* Variables *//
    const localhost = 'ws://localhost:10000/print';

    const socket = useRef(null);

    const [isConnected, setIsConnected] = useState(false);

    const [messages, setMessages] = useState([]);

    // Funciones del web socket
    const funcWebSocket = {
        obtenerImpresoras: 'GetPrinters',
        imprimir: 'PrintDocument'
    };

    //* Web Socket *//

    const [impresora, setImpresora] = useState(null)

    const [listImpresoras, setListImpresoras] = useState([])

    function connect(){

        if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
            socket.current = new WebSocket(localhost);
        }

        socket.current.onopen = () => {
            const msg = "✅ Conectado al WebSocket"
            console.log(msg);
            showSuccess(msg)
            setIsConnected(true);
        };

        socket.current.onclose = (e) => {
            const msg = "❌ Conexión cerrada: " + e.reason
            console.log(msg);
            showError(msg)
            setIsConnected(false);
        };

        socket.current.onerror = (err) => {
            console.error("❌ Error WebSocket:", err);
        };

        socket.current.onmessage = (event) => {
            console.log("📩 Mensaje recibido:", event.data);
            setMessages(prev => [...prev, event.data]); // Guardar mensajes en el estado
        };
    }

    function disconnect(){
        if (socket.current) {
            socket.current.close();
            setIsConnected(false)
        }
    }

    function sendMessage(msg) {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(msg);
        } else {
            console.warn("⚠️ No se puede enviar mensaje, WebSocket no está conectado");
        }
    }

    function ObtenerImpresoras() {
        sendMessage(JSON.stringify({
            Action: funcWebSocket.obtenerImpresoras,
            StatusCode: null,
            Message: null,
            ResponseModel: null,
        }));
    }

    function ImprimirDocumento(){
        sendMessage(JSON.stringify({
            Action: funcWebSocket.imprimir,
            StatusCode: null,
            Message: null,
            ResponseModel: {
                namePrinter: impresora,
                documents: pdfBytes,
            }
        }));
    }

    //* Archivos *//

    const [archivo, setArchivo] = useState(null)
    const [pdfBytes, setPdfBytes] = useState([])

    function SeleccionarDocumento(event){
        try{
            const file = event.target.files[0]

            if(file){
                setArchivo(file)
                ConvertirInBytes(file,setPdfBytes)
            }
        }
        catch(err){
            console.log(`Ocurrio un error al seleccionar el archivo${err}`)
        }
    }

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }


    function ConvertirInBytes(file, setHook){
        try{
            file.arrayBuffer()
                .then(arrayBuffer => {
                    const base64String = arrayBufferToBase64(arrayBuffer);

                    setHook(prev => [...(prev || []), base64String]);
                })
                .catch(err => {
                    console.log(`Ocurrio un error al convertir en bytes ${err}`);
                });
        }
        catch(err){
            console.log(`Ocurrio un error al convertir en bytes ${err}`)
        }
    }

    useEffect(() => {
        if(pdfBytes !== null){
            console.log(pdfBytes)
        }
    },[pdfBytes])

    // Respuesta por parte del Web Socket
    useEffect(() => {
        if(messages.length > 0){

            const lastMessage = messages[messages.length - 1];

            try {

                const result = JSON.parse(lastMessage); // ✅ solo el string válido
                const { Action, StatusCode, Message: msg, ResponseModel } = result;

                if (StatusCode === 200) {

                    if(Action === funcWebSocket.obtenerImpresoras){
                        setListImpresoras(
                            ResponseModel.map((m, i) => ({
                                id: i,
                                value: m,
                            }))
                        );
                    }

                    showSuccess(msg)
                    console.log(msg)
                }else{
                    showWarning(msg)
                }

            } catch (err) {
                console.error("Mensaje no es JSON válido:", lastMessage, err);
            }

        }
    },[messages])


    return{
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
    }
}