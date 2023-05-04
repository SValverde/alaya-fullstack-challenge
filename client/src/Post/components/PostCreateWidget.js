import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getId } from '../../User/UserReducer';
// Import Style

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState({});
  const classes = useStyles();

  const userId = useSelector(getId);

  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost(state);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const SubmitSection = () => {
    if (userId) {
      return (
        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content}>
          Submit
        </Button>
      )
    } else {
      return <div><a href="/login">Sign in</a> to create a post</div>
    }
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
      <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
      <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />
      <SubmitSection />
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
