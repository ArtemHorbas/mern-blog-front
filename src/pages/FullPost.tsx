import React from "react";
import { useParams } from 'react-router-dom'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { myAxios } from "../axios";
import  ReactMarkdown  from 'react-markdown'
import { useAppSelector } from "../redux/store";
import { CommentsItemsType, PostsItemsType } from "../redux/post/type";

export type FullPostItems = {
	doc: PostsItemsType,
	comments: CommentsItemsType[]
}


export const FullPost: React.FC = () => {
  
	const {id} = useParams();

	const UserData = useAppSelector(state => state.auth.data)

	const [data, setData] = React.useState<FullPostItems>({ doc: {}, comments: []})
	const [newComment, setNewComment] = React.useState(false)
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
	},[newComment])

	if(isLoading){
		return <Post isLoading={true} isFullPost/>
	}
		
	return (
    <>
      <Post
        _id={data.doc._id}
        title={data.doc.title}
        imageUrl={`http://localhost:3333${data.doc.imageUrl}`}
        user={data.doc.user}
        createdAt={data.doc.createdAt}
        viewsCount={data.doc.viewsCount}
				commentsCount={data.comments.length}
        tags={data.doc.tags}
        isFullPost
      >
        <ReactMarkdown children={data.doc.text ? data.doc.text : ''} />
      </Post>
			<CommentsBlock
        items={data.comments}
        isLoading={isLoading}
      >
        {UserData && <Index setNewComment={setNewComment} />}
      </CommentsBlock>
    </>
  );
};
