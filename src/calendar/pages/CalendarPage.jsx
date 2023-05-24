import { useState }from 'react'
import { Calendar } from 'react-big-calendar'
import { localizer , getMessages } from '../../helpers'
import { useUiStore } from '../../hooks'


import { addHours  } from 'date-fns'
import { NavBar , CalendarEvent, CalendarModal } from "../"

import 'react-big-calendar/lib/css/react-big-calendar.css'

const myEventsList =[{
  title: "Cumpleaños Luigi",
  notes: "This is fierst note",
  start: new Date(),
  end: addHours( new Date(),2),
  bgColor:'#fafafa',
  user: {
    _id:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    name: 'Luigi'
  }
}]

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();

  const [lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event , start, end, isSelected ) => { 
    
    // console.log({ event, start, end, isSelected });

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
    // console.log({ onViewChanged : event});  
    localStorage.setItem('lastView', event);
  }

  return (
      <>
        <NavBar />

        <Calendar 
            culture='es'
            localizer={ localizer }
            events={ myEventsList }
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

