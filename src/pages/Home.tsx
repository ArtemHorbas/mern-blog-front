import React from 'react';
import qs from 'qs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Status } from '../redux/auth/type';
import { setFilters, setParamId } from '../redux/filter/slice';
import { fetchComments, fetchPosts, fetchTags, urlParams } from '../redux/post/asyncThunk';

export const Home: React.FC = () => {
  
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { posts, tags, comments } = useAppSelector(state => state.post)
	const {data} = useAppSelector(state => state.auth)
	const {paramId, activeTag} = useAppSelector(state => state.filter)

	const isPostsLoading = posts.status === Status.FIRST;
	const isTagsLoading = tags.status === Status.FIRST;
	const isCommentsLoading = comments.status === Status.FIRST;
	
	const isMounted = React.useRef(false)
	const isSearch = React.useRef(false)
	const isTagsLoaded = React.useRef(false)

	React.useEffect(() => {
		if(isMounted.current){
			const queryString = qs.stringify({paramId, activeTag})

			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [paramId, activeTag])

	React.useEffect(() => {
		if(window.location.search){
			const params = (qs.parse(window.location.search.substring(1)) as unknown) as urlParams

			dispatch(setFilters(params))

			isSearch.current = true
		}
	},[])

	React.useEffect(() => {
		if(!isSearch.current){
			dispatch(fetchPosts({paramId, activeTag}))
			if(!isTagsLoaded.current){
				dispatch(fetchTags())
				dispatch(fetchComments())
			}
			
			isTagsLoaded.current = true
		}		
				
		isSearch.current = false
	}, [paramId, activeTag])


	return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={Number(paramId)}  aria-label="basic tabs example">
        <Tab onClick={() => dispatch(setParamId(0))} label="The newest" />
        <Tab onClick={() => dispatch(setParamId(1))} label="The most popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
					isPostsLoading ? (
						<Post key={index} isLoading={true} />
					) : (
            <Post
							key={obj._id}
              _id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:3333${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
							commentsCount={comments.items.filter(item => item.post._id == obj._id).length}
              tags={obj.tags}
              isEditable={data?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock
            items={comments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
