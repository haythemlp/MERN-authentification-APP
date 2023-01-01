import { Button, Container, TextField, FormControl, Grid, Link, Typography, Snackbar, Alert } from "@mui/material";
import { connect } from 'react-redux';
import { IState, } from "../redux/userReducer";
import { createUser } from '../redux/action'
import { TRegisterBodyRequest } from "../services/api";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";

const Register = ({ createUserApi, createUser }: any) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();


    const submitForm = () => {

        const body: TRegisterBodyRequest = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }

        createUser(body, (res: any) => { return navigate("/login"); }, () => {



        })

    }

    return (
        <div>
            <Typography component="h1" align="center" variant="h5">
                Register
            </Typography>


            <form className="form" onSubmit={e => e.preventDefault()}>
                <FormControl fullWidth sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}


                    />
                </FormControl>
                <FormControl fullWidth sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="lastname"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}



                    />
                </FormControl>
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

                    <TextField
                        fullWidth
                        label="confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}



                    />
                </FormControl>

                <FormControl fullWidth sx={{ pt: 2 }}>
                    <Button
                        onClick={submitForm}
                        disabled={(!firstName || !lastName || !validateEmail(email) || !password || !confirmPassword || password !== confirmPassword)}

                        fullWidth variant="contained" type="button" color="primary" >
                        Sign Up
                    </Button>
                </FormControl>

                <Grid container sx={{ pt: 2 }}>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>

            {createUserApi?.error?.data?.errors ? <Alert severity="error" sx={{ width: '100%', pt: 2 }}>
                {createUserApi.error.data.errors.map((err: any, i: number) => {

                    return (<p key={i}>{err.message}</p>)

                })}
            </Alert> : ''}

        </div>


    )
}

const mapStateToProps = (state: any) => {
    return {
        createUserApi: state.userReducer.createUserApi
    };
};



export default connect(mapStateToProps, { createUser })(Register);


