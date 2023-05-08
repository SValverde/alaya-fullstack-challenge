import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../UserActions';
import {
  TextField,
  Button,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';

// TODO Reuse login/signup styles
const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    alert: {
      padding: '6px 16px',
      borderRadius: '4px',
      fontSize: '0.875rem',
      backgroundColor: '#EDF7ED',
      color: 'rgb(30, 70, 32)',
    }
  })
);

const SignUp = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setAlert] = useState(false)

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(userSignup(formData)).then(res => {
        setFormData({email: '', password: '', confirmPassword: ''});
        setAlert(true);
      });
    } else {
      console.log("Errors in the form:", errors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} xl={3}>
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>

        {
          showAlert &&
          <div className={classes.alert}>Signup succesful! <a href="/login">Go to login</a></div>
        }
      </Grid>
    </Grid>
  );
};

export default SignUp;
