import React from 'react';
import qs from 'qs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchSortedPosts, fetchTags, setSortedPosts } from '../redux/slice/post';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../axios';

let tag;

export const Home = () => {
  
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { posts, tags } = useSelector(state => state.post)
	const {data} = useSelector(state => state.auth)

	const [paramId, setParamId] = React.useState(0)
	const [active, setActive] = React.useState(null)

	const isPostsLoading = posts.status === 'loading';
	const isTagsLoading = tags.status === 'loading';
	
	const isMounted = React.useRef(false)
	const isLoadedTags = React.useRef(false)

	React.useEffect(() => {
		if(isMounted.current){
			navigate(`?tag-${active}`)
		}

		isMounted.current = true
	},[active])

	React.useEffect(() => {
		if(window.location.search){
			const params = window.location.search.substring(5)
			tag = params == 'null' ? '' : params
			console.log(tag)
		}
	},[active])

	React.useEffect(() => {
		if(tag){
			dispatch(fetchSortedPosts({tag, paramId}))
		}else{
			dispatch(fetchPosts(paramId))
		}
		
		if(!isLoadedTags.current){ 
			dispatch(fetchTags())
		}
		isLoadedTags.current = true
	}, [paramId])

	
	return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={paramId}  aria-label="basic tabs example">
        <Tab onClick={() => setParamId(0)} label="The newest" />
        <Tab onClick={() => setParamId(1)} label="The most popular" />
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
          <TagsBlock setActive={setActive} paramId={paramId} items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
