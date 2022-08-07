import React, { ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { myAxios } from '../../axios'

export const AddPost: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [imageUrl, setImageUrl] = React.useState('')
	const [value, setValue] = React.useState('')
	const [isLoading, setLoading] = React.useState(false)

	const [tags, setTags] = React.useState('')
	const [title, setTitle] = React.useState('')

	const inputFileRef = React.useRef<HTMLInputElement>(null!)

	const handleChangeFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			const formData = new FormData()
			if (event.target.files) {
				const file = event.target.files[0]
				formData.append('image', file)
			}

			const { data } = await myAxios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (error) {
			console.warn(error)
			alert('Error when uploading the image')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onChange = React.useCallback((value: string) => {
		setValue(value)
	}, [])

	const onSubmit = async () => {
		try {
			setLoading(true)

			const fields = {
				title,
				imageUrl,
				tags: tags.split(','),
				text: value
			}

			const { data } = id
				? await myAxios.patch(`/posts/${id}`, fields)
				: await myAxios.post('/posts', fields)

			const _id = id ? id : data._id

			navigate(`/posts/${_id}`)
		} catch (error) {
			console.warn(error)
			alert('Error when uploading the post')
		}
	}

	React.useEffect(() => {
		if (id) {
			try {
				const getPost = async () => {
					const { data } = await myAxios.get(`/posts/${id}`)
					setTitle(data.title)
					setValue(data.text)
					setImageUrl(data.imageUrl)
					setTags(data.tags.join(','))
				}

				getPost()
			} catch (error) {
				console.warn(error)
				alert('Can not took the post')
			}
		}
	}, [])

	const options: any = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000
			}
		}),
		[]
	)

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant="outlined"
				size="large"
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<Button variant="contained" color="error" onClick={onClickRemoveImage}>
					Удалить
				</Button>
			)}
			{imageUrl && (
				<img
					className={styles.image}
					src={`https://mern-blog-4-portfolio.herokuapp.com${imageUrl}`}
					alt="Uploaded"
				/>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Заголовок статьи..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Тэги"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{id ? 'Save' : 'Publish'}
				</Button>
				<Link to="/">
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	)
}
