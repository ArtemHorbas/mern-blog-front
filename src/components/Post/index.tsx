import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useAppDispatch } from '../../redux/store';
import { setActiveTag } from '../../redux/filter/slice';
import { fetchRemovePost, fetchTags } from '../../redux/post/asyncThunk';
import { PostsItemsType } from '../../redux/post/type';

interface IPost extends PostsItemsType{
	commentsCount?: number,
	children?: React.ReactNode
	isFullPost?: boolean,
  isLoading?: boolean,
  isEditable?: boolean,
}
 
export const Post: React.FC<IPost> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
	commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

	const dispatch = useAppDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
		if(_id){
			dispatch(fetchRemovePost(_id))
			dispatch(fetchTags())
		}
	};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt ? createdAt : ''} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags && tags.map((name) => (
              <li 
								onClick={() => dispatch(setActiveTag(name))} 
								key={name} 
								style={{ cursor: 'pointer' }} 
							>
                #{name}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
						{commentsCount && 
							<li>
								<CommentIcon />
								<span>{commentsCount}</span>
							</li>
						}
          </ul>
        </div>
      </div>
    </div>
  );
};
