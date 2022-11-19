import { useState } from "react"

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState("");
    const [isAdminLoading, setIsAdminLoading] = useState(true)

    if(email){
        fetch(`http://localhost:5000/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
            setIsAdmin(data.isAdmin);
            setIsAdminLoading(false)
        })
        .catch((err) => console.log(err))
    }

    return [isAdmin, isAdminLoading]
}

export default useAdmin