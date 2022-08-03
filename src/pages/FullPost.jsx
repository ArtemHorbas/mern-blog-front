import React from "react";
import { useParams } from 'react-router-dom'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { myAxios } from "../axios";
import  ReactMarkdown  from 'react-markdown'
import { useSelector } from "react-redux";

export const FullPost = () => {
  
	const {id} = useParams();

	const [data, setData] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		async function getData() {
			try {
				const {data} = await myAxios.get(`/posts/${id}`)
				setData(data)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		
		getData()
	},[])

	if(isLoading){
		return <Post isLoading={true} isFullPost/>
	}
		
	return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:3333${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
