import React, { useState } from 'react'
import { addHours, differenceInSeconds } from 'date-fns'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";

registerLocale('es',es);

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
    const [isOpenModal, setIsOpenModal] = useState(true);
    // const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [ formValues , setFormValues ] = useState({
        title: 'Luigi',
        notes: 'This is a note with react calendar modal',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.value ] : target.value
        });
    }

    const onChangeDate = (event, changing ) => {
        setFormValues({
            ...formValues,
            [changing] : event
        });
    }

    const onCloseModal = () => {
        // console.log({ onCloseModal })
        setIsOpenModal(false);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // setFormSubmitted(true);
        const difference = differenceInSeconds( formValues.end, formValues.start);

        if( isNaN(difference) || difference <= 0 ){
            console.log('Revisar las fechas ingresadas');
            return;
        }

        if( formValues.title.length <= 0 ) return;

        console.log(formValues);

        onCloseModal();
        // setFormSubmitted(false);
    }

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpenModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            contentLabel="Calendar-App"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={ onSubmit } className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        className="form-control" 
                        placeholder="Fecha inicio"
                        selected={ formValues.start }
                        onChange={ (event)=> onChangeDate( event, 'start' )}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        className="form-control" 
                        placeholder="Fecha Fin"
                        selected={ formValues.end }
                        minDate={ formValues.start }
                        onChange={ (event)=> onChangeDate( event, 'end' )}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
