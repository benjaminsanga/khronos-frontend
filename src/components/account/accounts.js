import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities"
import {useGetAllUsers} from "../../hooks/customHooks";

const UsersComponent = () => {

    const [users, setUsers] = useState([]);
    const {
        isLoading,
        isSuccess,
        data
    } = useGetAllUsers()

    useEffect(() => {
        setUsers(data?.data)
    }, [data]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
        {isSuccess && <div id="users" className='container'>
            <h1 style={{fontSize: '3.5rem'}}>{users?.length}</h1>
            <h2 className="mb-5">Users on Khronos</h2>
            <div className="row">
                {users?.map((user, index) => {
                    return (
                    <div className="col-md-3" key={index}>
                        <div className="user">
                            <Link to={`/account/dashboard/${user._id}`}>
                                <h3>{toFirstLetterUpperCase(user.user_name)}</h3>
                                <span>@ {`${user.user_lga} ${user.user_state}`}</span>
                                    {/*<span>Admin: {`${toFirstLetterUpperCase(user.user_admin_firstname)} ${toFirstLetterUpperCase(user.user_admin_lastname)}`}</span>*/}
                                <span><i className="fa fa-phone"></i> {user.user_admin_phone}</span>
                            </Link>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
        }
        </>
    );
};

export default UsersComponent;
