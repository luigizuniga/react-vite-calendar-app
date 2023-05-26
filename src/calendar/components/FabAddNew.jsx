import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns';

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClicNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(),2),
            bgColor:'#fafafa',
            user: {
              _id:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
              name: 'Luigi'
            }
        });

        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClicNew }
            >
            <i className="fas fa-plus"></i>
        </button>
    )
}
