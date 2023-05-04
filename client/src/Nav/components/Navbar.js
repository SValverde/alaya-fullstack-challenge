import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from "react-redux";
import { getEmail } from "../../User/UserReducer";
import { userLogout } from '../../User/UserActions';


function Navbar() {

    const userEmail = useSelector(getEmail);
    const dispatch = useDispatch();

    const AuthSection = () => {
        if (!userEmail) {
            return (
                <>
                    <Typography className='mr-4' variant="h6" >
                        <Link href="/signup" className="text-white">Sign up</Link>
                    </Typography>
                    <Typography variant="h6" >
                        <Link href="/login" className="text-white">Log in</Link>
                    </Typography>
                </>
            )
        } else {
            return (
                <>
                    <Typography className="text-white mr-4" variant="h6" >{userEmail}</Typography>
                    <Button onClick={() => dispatch(userLogout())} variant="outlined">Log out</Button>
                </>
            )
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar className="justify-content-between">
                <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography>

                <div className='d-flex'>
                    <AuthSection/>
                </div>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
