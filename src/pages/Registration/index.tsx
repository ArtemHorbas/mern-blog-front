import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { LoginValues } from '../Login';
import { isAuthSelector } from '../../redux/auth/slice';
import { fetchRegister } from '../../redux/auth/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export interface RegisterValues extends LoginValues{
	fullName: string
}

export const Registration: React.FC = () => {
  
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(isAuthSelector)	

	const {register, handleSubmit, formState: {errors, isValid}} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (values: RegisterValues) => {
		dispatch(fetchRegister(values))
	}

	if(isAuth){
		return <Navigate to='/' />
	}
	
	return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
				<TextField 
					className={styles.field} 
					label="Full Name"
					type="text"
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					{...register('fullName', {required: 'Write your name', minLength: {value: 3, message: "This input must exceed 3 characters"}})}
					fullWidth 
				/>
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
				<Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
					Register
				</Button>
			</form>
    </Paper>
  );
};
