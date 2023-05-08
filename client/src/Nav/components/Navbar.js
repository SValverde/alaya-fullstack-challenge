import React, { useEffect } from 'react';
import './Navbar.css';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../logo.svg';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from "react-redux";
import { getEmail } from "../../User/UserReducer";
import { loadUser, userLogout } from '../../User/UserActions';

function Navbar() {

    const userEmail = useSelector(getEmail);
    const dispatch = useDispatch();

    // TODO Probably should do this somewhere else
    useEffect(() => {
        dispatch(loadUser())
    }, []);

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
                    <Button onClick={() => dispatch(userLogout())} variant="contained">Log out</Button>
                </>
            )
        }
    }

    return (
        <AppBar position="fixed">
            <Toolbar className="justify-content-between">
            <a href="/" className="logoLink d-flex align-items-center">
                <img className="ml-3 mr-2" src={Logo} alt="Logo" style={{ height: '40px' }} />
                <Typography variant="h6" className="text-white" >Alaya blog</Typography>
            </a>

            <div className='d-flex'>
                <AuthSection />
            </div>
        </Toolbar>
    </AppBar>
    );

};

export default Navbar;
