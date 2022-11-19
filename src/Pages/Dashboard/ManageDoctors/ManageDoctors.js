import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const closeModal = () => {
        setDeleteDoctor(null)
    }

   

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async() => {
            const res = await fetch("http://localhost:5000/doctors", {
                headers: {authorization: `Bearer ${localStorage.getItem("accessToken")}`}
            })
            const data = await res.json();
            return data
        }
    })

    const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                refetch()
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <h4>Manage Doctors</h4>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='text-white'>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr key={index}>
                                <th> <img className='w-12 h-12 rounded-full' src={doctor.image} alt="" /> </th>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td> <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirm-modal" className="btn btn-primary btn-xs">Delete</label> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                title={"Are you sure you want to delete"}
                message={`If you delete ${deleteDoctor.name}. It cannot be undone`}
                closeModal={closeModal}
                handleDeleteDoctor={handleDeleteDoctor}
                modalData={deleteDoctor}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;