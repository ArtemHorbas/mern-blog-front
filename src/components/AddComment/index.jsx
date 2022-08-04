import React from "react";

import styles from "./AddComment.module.scss";
import { useParams } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { myAxios } from "../../axios";

export const Index = ({setNewComment}) => {
  
	const {id} = useParams()

	const [text, setText] = React.useState('')
	const {data} = useSelector(state => state.auth)

	const onClick = async () => {

		const fields = {
			text,
			postId: id
		}

		try {
			const {data} = await myAxios.post('/comments', fields)
			await setNewComment(data)
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
          src={data.avatarUrl}
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
