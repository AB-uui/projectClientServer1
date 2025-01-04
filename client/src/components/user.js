import axios from 'axios'
import { useState,useEffect } from 'react'

const Users = () => {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true);

const getUsers = async () => {
    //******GET - getAllUsers***** */
    try {
        const res = await axios.get('http://localhost:7777/api/users/0')
        if (res.status === 200) {
            console.log(res.data);
            setUsersData(res.data)
        }
        else{
            
        }
        // debugger
    } catch (e) {
        console.error(e)

    }
    finally {
        setLoading(false);
      }
      

    //******POST - createUser***** */
}
useEffect(() => {
        getUsers();
      }, []);
    return(
        <div>
        {loading ? (
          <p>Loading...</p>
        ) : usersData.length > 0 ? (
          usersData.map((user) => (
            <div
              key={user._id}
              style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    )
}

export default Users