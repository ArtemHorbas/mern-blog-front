import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Login.module.scss";
import { fetchAuth, isAuthSelector } from "../../redux/slice/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector)	

	const {register, handleSubmit, formState: {errors, isValid}} = useForm({
		defaultValues: {
			email: 'pivo@dora.ua',
			password: 'rapgame'
		},
		mode: 'onChange'
	})

	const onSubmit = values => {
		dispatch(fetchAuth(values))
		if(!isAuth){
			return alert('Incorrect email or password')
		}
	}

	if(isAuth){
		return <Navigate to='/' />
	}
	
	return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Enter your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					type='email'
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register('email', {required: 'Write an email'})}
					fullWidth
				/>
				<TextField 
					className={styles.field} 
					label="Password"
					type="password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register('password', {required: 'Write a password', minLength: {value: 4, message: "This input must exceed 4 characters"}})} 
					fullWidth 
				/>
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Enter
				</Button>
			</form>
    </Paper>
  );
};
