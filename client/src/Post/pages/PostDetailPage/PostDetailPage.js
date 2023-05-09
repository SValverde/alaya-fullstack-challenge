import React, { useEffect } from 'react';
import './PostDetailPage.css';
import { useDispatch, useSelector } from 'react-redux';
// Import Actions
import { fetchPost } from '../../PostActions';
// Import Selectors
import { useParams } from 'react-router-dom';
import PostListItem from '../../components/PostListItem';

export function PostDetailPage() {

  const { cuid } = useParams();
  const post = useSelector(state => state.posts.data.find(currentPost => (currentPost.cuid === cuid)));
  const dispatch = useDispatch();


  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid));
  }, []);

  return (post
    ?
      (<div id="postDetail" className="container">
            <PostListItem
              post={post}
              key={post.cuid}
            />
          </div>
      )
    : (<div>Loading</div>)
  );
}
export default PostDetailPage;
