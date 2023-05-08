import React, { useState } from 'react';
import './PostCreateWidget.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import imageIcon from '../../assets/imgs/image-icon.png';
import trashIcon from '../../assets/imgs/trash.png';
import { makeStyles } from '@material-ui/core/styles';
// Import Style

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1),
    },
  },
}));

const PostCreateWidget = ({ addPost }) => {

  const [state, setState] = useState({name: '', title: '', content: '', image: null, loading: false});
  const classes = useStyles();

  const submit = () => {
    if (state.name && state.title && state.content) {
      console.log("State:",state);
      setState({
        ...state,
        loading: true
      })
      addPost(state).then(()=>{
        setState({
          name: '',
          title: '',
          content: '',
          image: null,
          loading: false
        })
      })
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleFile = (evt) => {
    setState({
      ...state,
      image: evt.target.files[0]
    })
  }

  const clearFile = () => {
    document.getElementById('post-image-file-select').value = null;
    setState({
      ...state,
      image: null
    })
  }

  return (
    <div className={`${classes.root} widget-root d-flex flex-column mb-4 w-100`}>
      <h3 className="mb-3">What's up?</h3>

      <div className="d-flex flex-column mt-2">
        <TextField variant="outlined" label="Author name" name="name" value={state.name} onChange={handleChange} />
        <TextField variant="outlined" label="Post title" name="title" value={state.title} onChange={handleChange} />
        <TextField variant="outlined" multiline rows="4" label="Post content" value={state.content} name="content" onChange={handleChange} />
      </div>

      <div className="post-control-wrapper d-flex justify-content-between align-items-center p-2">
        <label className="m-0" htmlFor="post-image-file-select">
          <img width="26" src={imageIcon} />
          <small className="ml-2">Attach file</small>
        </label>
        <input id="post-image-file-select" className="d-none" type="file" name="image" onChange={handleFile}></input>
        {state.image 
          &&
          <small><span onClick={clearFile} className="remove-file"><img src={trashIcon} height="14" /></span>{state.image.name}</small>
        }
      </div>

      <Button className="mt-0" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content || state.loading}>
        {state.loading ? 'Loading...' : 'Submit'}
      </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
