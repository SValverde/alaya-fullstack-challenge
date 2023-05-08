import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import SignUp from './User/pages/SignupPage/SignupPage';
import Login from './User/pages/LoginPage/LoginPage';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#1ecde2',
            main: '#305252',
        },
    },
});

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <div className="w-100">
                <Provider store={props.store}>
                    {/* PersistGate after implementing redux-persist */}
                    {/* <PersistGate loading={null} persistor={persistor}> */}
                    <Navbar />
                    <div className="w-100 mt-5 pt-5 ">
                        <BrowserRouter>
                            <Switch>
                                <Route path="/" exact component={PostListPage} />

                                {/* TODO prevent signup and login navigation when user is already signed in */}
                                <Route path="/signup" exact component={SignUp} />
                                <Route path="/login" exact component={Login} />

                                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                    {/* </PersistGate> */}
                </Provider>
            </div>
        </ThemeProvider >
    );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
