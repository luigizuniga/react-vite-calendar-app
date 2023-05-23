import { Calendar } from 'react-big-calendar'
import { localizer , getMessages } from '../../helpers'

import { addHours  } from 'date-fns'
import { NavBar } from ".."

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

  const eventStyleGetter = ( event , start, end, isSelected ) => { 
    
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return style;
  }

  return (
      <>
        <NavBar />

        <Calendar 
            culture='es'
            localizer={ localizer }
            events={ myEventsList }
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 80px )'}}
            messages={ getMessages() }
            eventPropGetter={eventStyleGetter}
        />
      </>
  )
}

