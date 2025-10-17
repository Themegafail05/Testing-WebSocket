import { ToastContainer } from 'react-toastify';

export default function Toast({
    position="top-right",
    autoClose=1500,
    hideProgressBar=false,
    newestOnTop=false,
    closeOnClick=true,
    rtl= false,
    pauseOnFocusLoss = true,
    draggable = true,
    pauseOnHover = true,
    theme="colored"
})
{

    return(
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            newestOnTop={newestOnTop}
            closeOnClick={closeOnClick}
            rtl={rtl}
            pauseOnFocusLoss={pauseOnFocusLoss}
            draggable={draggable}
            pauseOnHover={pauseOnHover}
            theme={theme}
        />

    )
}