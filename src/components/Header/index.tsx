import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { isAuthSelector, logOut } from '../../redux/auth/slice';

export const Header: React.FC = () => {

	const dispatch = useAppDispatch()
  const isAuth = useAppSelector(isAuthSelector)

	const {data} = useAppSelector(state => state.auth)
	const token = data ? data.token : ''

	const isMounted = React.useRef(false)

	React.useEffect(() => {
		if(isMounted.current){
			if(token){
				localStorage.setItem('token', token)
			}
		}

		isMounted.current = true
	},[token])

  const onClickLogout = () => {
		if(window.confirm('Are you sure want to logout')){
			dispatch(logOut())
		}
	};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
