import { Button, Container, TextField, FormControl, Grid, Link, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/action";
import { TLoginBodyRequest } from "../services/api";
import { validateEmail } from "../utils/validation";


function Login({ loginApi, loginUser }: any) {

    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");


    const [email, setEmail] = useState('haytha@gmail.com');
    const [password, setPassword] = useState('123456');

    const login = () => {

        const bodyRequest: TLoginBodyRequest = {
            email,
            password
        }

        loginUser(bodyRequest, () => { return navigate("/profile") },()=>{})

    }



    return (
        <div>


            <Typography component="h1" align="center" variant="h5">
                Sign in
            </Typography>

            <form className="form">
                <FormControl fullWidth sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </FormControl>
                <FormControl fullWidth sx={{ pt: 2 }}>
                    <TextField


                        fullWidth
                        label="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </FormControl>

                <FormControl fullWidth sx={{ pt: 2 }}>
                    <Button
                        disabled={(!validateEmail(email) || !password)}
                        onClick={login}

                        fullWidth variant="contained" type="button" color="primary" >
                        Log in
                    </Button>
                </FormControl>
                <Grid container sx={{ pt: 2 }}>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>

            {loginApi?.error?.data?.errors ? <Alert severity="error" sx={{ width: '100%', pt: 2 }}>
                {loginApi.error.data.errors.map((err: any, i: number) => {

                    return (<p key={i}>{err.message}</p>)

                })}
            </Alert> : ''}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        loginApi: state.userReducer.loginApi
    };
};
export default connect(mapStateToProps, { loginUser })(Login);
