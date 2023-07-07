import {  useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents  , onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events , activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {
        try {
            if( calendarEvent.id ){
                // ** Update onUpdateEvent
                await calendarApi.put(`http://localhost:4000/api/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent , user }));
                return;
            }else{
                // Create onAddNewEvent
                const { data } = await calendarApi.post('http://localhost:4000/api/events', calendarEvent );  
                dispatch( onAddNewEvent({ ...calendarEvent, id : data.event.id, user  }));
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`http://localhost:4000/api/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try{
            const { data } = await calendarApi.get('http://localhost:4000/api/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch( onLoadEvents(events));
        }catch(error){
            console.log('Error al cargar los eventos');
            console.log(error);
        }
    }

    return {
        activeEvent,
        events,
        //para saber si tenemos un evento activado, hasEvent retorna true o false, para activacion de boton eliminar
        hasEventSelected:!!activeEvent,
        
        setActiveEvent,
        startDeleteEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}