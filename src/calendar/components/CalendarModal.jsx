import React , { useState }from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}

export const CalendarModal = () => {
    const [ isOpenModal, setIsOpenModal ] = useState(true)
    const onCloseModal = () =>{
        console.log({ onCloseModal })
        setIsOpenModal(false)
    }


    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={ isOpenModal }
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
            contentLabel="Calendar-App"
            >
                <h1>Hola Mundo</h1>
                <hr/>
                <p>Esto es un modal de React Modal</p>
        </Modal>
    )
}
