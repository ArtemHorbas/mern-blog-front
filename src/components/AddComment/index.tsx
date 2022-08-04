import React from "react";

import styles from "./AddComment.module.scss";
import { useParams } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { myAxios } from "../../axios";
import { useAppSelector } from "../../redux/store";

type AddCommentType = {
	setNewComment: (param: boolean) => void
}

export const Index: React.FC<AddCommentType> = ({setNewComment}) => {
  
	const {id} = useParams()

	const [text, setText] = React.useState('')
	const {data} = useAppSelector(state => state.auth)

	const onClick = async () => {

		const fields = {
			text,
			postId: id
		}

		try {
			await myAxios.post('/comments', fields)
			setNewComment(true)
			setText('')
		} catch (error) {
			console.warn(error)
			alert('Error while uploading new comment')
		}
	}

	return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data?.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
						value={text}
						onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <Button onClick={onClick} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
