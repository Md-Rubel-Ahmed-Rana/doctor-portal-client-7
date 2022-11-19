import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const navigate = useNavigate()

    const [token] = useToken(createdUserEmail)

    if(token){
        navigate("/")
    }

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
        .then(() => {
            toast("User created successfully")
            const userInfo = {displayName: data.name}
            updateUser(userInfo)
            .then(() => {
                toast("User updated successfully");
                saveUser(data.name, data.email)
            })
            .catch((err) => console.log(err))
        })
        .catch((error) => console.log(error))
    }

    const saveUser = (name, email) => {
        const user = {name, email};

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(() => {
            setCreatedUserEmail(email)
        })
        .catch((err) => console.log(err))
    }


    return (
        <div className="flex justify-center my-10 items-center">
            <div className="w-96">
                <h3 className="text-4xl">Sign Up</h3>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input className="border" type="text"
                            {...register("name",
                                { required: "Name is required",}
                            )} />
                        {errors.name && <span className="text-red-500">{errors.name?.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input className="border" type="email"
                            {...register("email",
                                {required: "Email address is required",}
                            )} />
                        {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span> </label>
                        <input className="border" type="password"  
                        {...register("password", 
                        { required: "Password address is required", 
                        minLength: { value: 6, message: "Password must be 6 characters or longer" },
                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                         })} />
                        {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
                        <label className="label"><span className="label-text">Forget Password</span> </label>
                    </div>
                    <div className="text-center">
                        <input className="btn text-white btn-aceent w-1/2 " type="submit" value="Sign Up" />
                        <p>Already have an account? <Link to="/login" className="text-secondary">Login</Link> </p>
                    </div>
                    <div className="divider">OR</div>
                </form>
                <div className="text-center">
                    <button onClick={googleSignIn} className="btn btn-outline">CONTINIUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;