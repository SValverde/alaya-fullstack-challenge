import React from 'react';
import './PostListItem.css';
import PropTypes from 'prop-types';
import trashIcon from '../../assets/imgs/trash.png';

function PostListItem({ post, onDelete }) {
  return (
    <div className="my-card">
      <div className="d-flex justify-content-between">
        <h4 className="my-card-title mr-3">{post.title}</h4>
        <div className="post-delete" onClick={onDelete}><img width="20" src={trashIcon}></img></div>
      </div>
      <div className="my-card-author"><small>@{post.name}</small></div>
      <div className="my-card-content">{post.content}</div>
      { post.image &&
      <div className="my-card-image">
        <a href={post.image} target="_blank"><img src={post.image}/></a>
      </div>}
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
