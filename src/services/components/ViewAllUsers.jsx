import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService.jsx';
// import '../styles/BusComponent.css';
import { useSelector } from 'react-redux';
import '../styles/Table.css';

const ViewAllUsers = () => {
  const [userList, setUserList] = useState([]);
  const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        // Fetch buses
        UserService.getAllUsers(token)
            .then(response => {
                setUserList(response.data);
                console.log("State variable for getAll changed...");
                console.log("response received from API for getAll", response.data);
            })
            .catch(error => {
                console.error("Error fetching routes:", error);
                alert("Error fetching all users")
            });
    }, []);

    const deleteUser = (userId) => {
        // Delete the bus with the given ID
        UserService.deleteUser(userId,token)
            .then(() => {
                // Remove the bus from the list
                setUserList(prevList => prevList.filter(user => user.userid !== userId));
                console.log("User deleted successfully.");
                alert("User deleted successfully!")
            })
            .catch(error => {
                console.error("Error deleting user:", error);
                alert("Error deleting user!")
            });
    };

    return (
        <div className="bg">
      <div className="table-responsive">
        <table className="table  table-striped">
          <thead style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderCollapse: 'separate', borderSpacing: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <tr className='table-primary'>
                          <th>User Id</th>
                            <th>User Name</th>
                            <th>Gender</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, key) => (
                            <tr key={key}>
                                <td>{user.userid}</td>
                                <td>{user.userName}</td>
                                <td>{user.gender}</td>
                                <td>{user.mobileNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.roles}</td>
                                
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => deleteUser(user.userid)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllUsers;