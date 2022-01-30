import * as React from 'react'
import { useDispatch } from 'react-redux'
import { logout, openSignup } from '../redux/actions/main'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import adminAvatar from '../assets/admin.jpg'
import userAvatar from '../assets/user.jpg'

function Navbar({ isAuth, isAdmin }) {
	const dispatch = useDispatch()
	const openDialog = () => {
		dispatch(openSignup(true))
	}
	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<div className="navbar">
			<div className="navbar-inner">
				<div className="navbar-logo">
					<RouterLink to="/">
						<img src={ logo } alt="Профиланс групп" className="logo" />
					</RouterLink>
				</div>
				<div className="navbar-menu__item">
					<RouterLink to="/news">
						Новости
					</RouterLink>
				</div>
				<div className="navbar-avatar">
					{ isAuth && !isAdmin &&
						<img src={ userAvatar } alt=""/>
					}
					{ isAdmin &&
						<img src={ adminAvatar } alt=""/>
					}
				</div>
				<div className="navbar-button">
					{ !isAuth
						?
							<button onClick={ openDialog }>
								Войти
							</button>
						: 
							<button onClick={ logoutHandler }>
								Выйти
							</button>
					}
				</div>
			</div>
		</div>
	)
}
export default Navbar
