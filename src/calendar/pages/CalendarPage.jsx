import { useState }from 'react'
import { Calendar } from 'react-big-calendar'
import { localizer , getMessages } from '../../helpers'
import { useUiStore , useCalendarStore } from '../../hooks'

import { NavBar , CalendarEvent, CalendarModal } from "../"

import 'react-big-calendar/lib/css/react-big-calendar.css'


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();

  const [lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event , start, end, isSelected ) => { 
    

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return style;
  }

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick : event});  
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click : event});  
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
  }

  return (
      <>
        <NavBar />

        <Calendar 
            culture='es'
            localizer={ localizer }
            events={ events }
            defaultView={ lastView }
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 80px )'}}
            messages={ getMessages() }
            eventPropGetter={eventStyleGetter}
            components={{ event: CalendarEvent }}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelect }
            onView={ onViewChanged }
        />

        <CalendarModal/>
      </>
  )
}

