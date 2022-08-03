import React from 'react';
import qs from 'qs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchTags } from '../redux/slice/post';
import { useNavigate } from 'react-router-dom';
import { setFilters, setParamId } from '../redux/slice/filter';

export const Home = () => {
  
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { posts, tags } = useSelector(state => state.post)
	const {data} = useSelector(state => state.auth)
	const {paramId, activeTag} = useSelector(state => state.filter)

	const isPostsLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';
	
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
			const params = qs.parse(window.location.search.substring(1))

			dispatch(setFilters(params))

			isSearch.current = true
		}
	},[])

	React.useEffect(() => {
		if(!isSearch.current){
			dispatch(fetchPosts({paramId, activeTag}))
			if(!isTagsLoaded.current){
				dispatch(fetchTags())
			}
		}		
				
		isSearch.current = false
		isTagsLoaded.current = true
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
              tags={obj.tags}
              isEditable={data?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
