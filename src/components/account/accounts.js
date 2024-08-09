import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../utils/loading";
import { toFirstLetterUpperCase } from "../../utils/utilities"
import {useGetAllAccounts} from "../../hooks/customHooks";

const AccountsComponent = () => {

    const [accounts, setAccounts] = useState([]);
    const {
        isLoading,
        isSuccess,
        data
    } = useGetAllAccounts()

    useEffect(() => {
        setAccounts(data?.data)
    }, [data]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
        {isSuccess && <div id="accounts" className='container'>
            <h1 style={{fontSize: '3.5rem'}}>{accounts?.length}</h1>
            <h2 className="mb-5">Accounts on Khronos</h2>
            <div className="row">
                {accounts?.map((account, index) => {
                    return (
                    <div className="col-md-3" key={index}>
                        <div className="account">
                            <Link to={`/account/dashboard/${account._id}`}>
                                <h3>{toFirstLetterUpperCase(account.account_name)}</h3>
                                <span>@ {`${account.account_lga} ${account.account_state}`}</span>
                                    {/*<span>Admin: {`${toFirstLetterUpperCase(account.account_admin_firstname)} ${toFirstLetterUpperCase(account.account_admin_lastname)}`}</span>*/}
                                <span><i className="fa fa-phone"></i> {account.account_admin_phone}</span>
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

export default AccountsComponent;
