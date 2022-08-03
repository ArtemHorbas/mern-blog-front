import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthSelector, logOut } from '../../redux/slice/auth';

export const Header = () => {

	const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)

	const {data} = useSelector(state => state.auth)
	const token = data ? data.token : ''

	const isMounted = React.useRef(false)

	React.useEffect(() => {
		if(isMounted.current){
			localStorage.setItem('token', token)
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
