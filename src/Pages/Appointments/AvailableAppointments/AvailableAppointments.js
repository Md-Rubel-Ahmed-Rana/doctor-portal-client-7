import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, {  useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOptions from './AppointmentOptions';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, "PP")
    const { data: appointmentOptions = [], refetch, isLoading} = useQuery({
        queryKey: ["appointmentOptions", date],
        queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            .then((res) => res.json())
    })

    if (isLoading){
        return <Loading />
    }

    return (
        <div className='m-5'>
            <h2 className='text-center text-primary font-bold my-5'>Available Appointments on {format(selectedDate, "PP")}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    appointmentOptions.map((appointmentOption, index) => <AppointmentOptions
                        key={index}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}

                    />)
                }
            </div>
            { treatment && <BookingModal 
                treatment={treatment}
                selectedDate={selectedDate}
                setTreatment={setTreatment}
                refetch={refetch}
             />}
        </div>
    );
};

export default AvailableAppointments;