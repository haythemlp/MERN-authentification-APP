import { Button } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../redux/action";

function Profile({ currentUser, getCurrentUser }: any) {
    const navigate = useNavigate();


    useEffect(() => {
        getCurrentUser(() => { }, () => {
            return navigate("/login")

        })

    }, [])

    const logout = () => {
        localStorage.clear();
        return navigate("/")

    }

    return (

        currentUser?.data ? (<div >
            <h1>
                Hi {currentUser?.data?.firstname} {currentUser?.data?.lastname}
            </h1>

            <h2>
                email :{currentUser?.data?.email}
            </h2>
            <Button onClick={logout}>Logout </Button>
        </div>)
            : <div></div>

    )
}



const mapStateToProps = (state: any) => {
    return {
        currentUser: state.userReducer.getCurrentUserApi
    };
};

export default connect(mapStateToProps, { getCurrentUser })(Profile);


