import { createSlice } from "@reduxjs/toolkit";
import { addHours  } from 'date-fns'

const tempEvent = {
    title: "Cumpleaños Luigi",
    notes: "This is fierst note",
    start: new Date(),
    end: addHours( new Date(),2),
    bgColor:'#fafafa',
    user: {
      _id:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      name: 'Luigi'
    }
};

export const calendarSlice = createSlice ({
    name: 'calendar',
    initialState: {
        events: [ tempEvent ],
        activeEvent: null,
    },
    reducers: {

    },
});

export const { onStyle } = calendarSlice.actions;