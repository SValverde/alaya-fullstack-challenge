import React from 'react';
import './PostListItem.css';
import PropTypes from 'prop-types';
import trashIcon from '../../assets/imgs/trash.png';
import { getId } from '../../User/UserReducer';
import { useSelector } from 'react-redux';

function PostListItem({ post, onDelete }) {

  const userId = useSelector(getId);

  return (
    <div className="my-card">
      <div className="d-flex justify-content-between">
        <h4 className="my-card-title mr-3"><a href={`/posts/${post.cuid}/${post.slug}`}>{post.title}</a></h4>
        {
          // TODO add delete function to post detail
          userId == post.author && onDelete &&
          <div className="post-delete" onClick={onDelete}><img width="20" src={trashIcon}></img></div>
        }
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
    author: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
