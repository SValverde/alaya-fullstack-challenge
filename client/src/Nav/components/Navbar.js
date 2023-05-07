import React from 'react';
import './Navbar.css';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../logo.svg';

function Navbar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <a href="/" className="logoLink d-flex align-items-center">
                    <img className="ml-3 mr-2" src={Logo} alt="Logo" style={{ height: '40px' }} />
                    <Typography variant="h6" className="text-white" >Alaya blog</Typography>
                </a>

                {/* <Typography variant="h6" >
                    <Link href="/" className="text-white">Home</Link>
                </Typography> */}
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
