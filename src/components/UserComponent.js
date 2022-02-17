import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Spinner from 'react-bootstrap/esm/Spinner';

const UserComponent = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState()
    
    useEffect(() => {
        const userParam = searchParams.get("user")
        setUser(userParam)
    },[searchParams])

    const [{ data, loading, error }, refetch] = useAxios(
        `${process.env.REACT_APP_API_URL}/user/${user}`,{
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
    }})

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    return (
        <div>
            <span>{data}</span>
            <hr/>
            <button onClick={refetch}>Refetch</button>
        </div>
    )
}

export default UserComponent