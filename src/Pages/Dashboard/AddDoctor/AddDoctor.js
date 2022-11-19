import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imageHostKey;
    const navigate = useNavigate()

    const {data: specialties = []} = useQuery({
        queryKey: ["specialty"],
        queryFn: async() => {
            const res = await fetch("http://localhost:5000/appointmentSpecialty");
            const data =await res.json();
            return data
        }
    })

    const handleSignUp = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((imgData) => {
            if (imgData.success){
                const doctor = {
                    name: data.name,
                    specialty:data.specialty ,
                    email: data.email,
                    image: imgData.data.url
                }

                // save doctor info in database
                fetch("http://localhost:5000/doctors", {
                    method: "POST",
                    headers: {
                        "content-type" : "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify(doctor) 
                })
                .then((res) => res.json())
                .then(() => {
                    swal("Good job!", `${data.name} is added successfully`, "success");
                    navigate("/dashboard/managedotors")
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='w-1/2'>
            <h3 className='text-3xl'>Add a Doctor</h3>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="form-control w-full">
                    <label className="label">
                        <span>Name</span>
                    </label>
                    <input className="border" type="text"
                        {...register("name",
                            { required: "Name is required", }
                        )} />
                    {errors.name && <span className="text-red-500">{errors.name?.message}</span>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span>Email</span>
                    </label>
                    <input className="border" type="email"
                        {...register("email",
                            { required: "Email address is required", }
                        )} />
                    {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
                </div>
                <div className="form-control mb-4 w-full">
                    <label className="label"><span>Specialty</span> </label>
                    <select  
                        {...register("specialty")}
                    className="select select-bordered w-full">
                        <option disabled selected>Pick a specialty</option>
                        {
                            specialties.map((specialty) => <option key={specialty._id}>{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control mb-5 w-full">
                    <label className="label">
                        <span>Photo</span>
                    </label>
                    <input className="border" type="file"
                        {...register("image",
                            { required: "Photo is required", }
                        )} />
                    {errors.img && <span className="text-red-500">{errors.img?.message}</span>}
                </div>
                <div className="text-center">
                    <input className="btn text-white btn-aceent w-1/2 " type="submit" value="Add Doctor" />
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;