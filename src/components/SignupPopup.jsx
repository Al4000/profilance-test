import * as React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authLogin, isAdmin, isAuth, openSignup } from '../redux/actions/main'
import { CSSTransition } from 'react-transition-group'
import CheckboxIcon from './icons/CheckboxIcon'

function SignupPopup({ users, isOpen }) {
	const dispatch = useDispatch()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [submit, setSubmit] = useState(false)
	const [valid, setValid] = useState(false)
	const nodeRef = useRef(null)
	const input = useRef(null)

	const closeDialog = () => {
		dispatch(openSignup(false))
	}

	const closeOnEsc = (e) => {
		if ((e.charCode || e.keyCode) === 27) {
			closeDialog()
		}
	}

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEsc)
		return function cleanup() {
			document.body.removeEventListener('keydown', closeOnEsc)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmit(true)

		if (users.hasOwnProperty(login) && users[login].password === password) {
			setValid(true)
			dispatch(isAuth(true))
			if (login === 'admin') {
				dispatch(isAdmin(true))
			}
			dispatch(authLogin(login))
			dispatch(openSignup(false))

			// reset to init after close popup
			setTimeout(() => {
				setLogin('')
				setPassword('')
				setValid(false)
				setSubmit(false)
			}, 500)
		} else {
			setValid(false)
		}
	}

	useEffect(() => {
		setSubmit(false)
	}, [login, password])

	return ReactDOM.createPortal(
		<CSSTransition
			in={ isOpen }
			unmountOnExit
			timeout={{ enter: 0, exit: 500 }}
			classNames="fade"
			nodeRef={ nodeRef }
			onEnter={ () => input.current.focus() }
		>
			<div ref={ nodeRef } className="modal">
				<div className="modal-overlay" />
				<div className="modal-container" onClick={ closeDialog }>
					<div className="modal-dialog" onClick={ e => e.stopPropagation() }>
						<h2 className="modal-title">Авторизация</h2>
						<div className="modal-content">
							<div className="modal-content__inner">
								<form onSubmit={ handleSubmit }>
									<div className="modal-content__field">
										<input
											type="text"
											placeholder="Введите логин"
											className={(submit && !login) || (submit && !valid) ? 'input--error' : ''}
											onChange={ e => setLogin(e.target.value) }
											ref={ input }
										/>
										{ submit && !login &&
											<p className="text--error modal-label__error">Поле Логин не может быть пустым</p>
										}
									</div>
									<div className="modal-content__field">
										<input
											type="password"
											placeholder="Введите пароль"
											className={(submit && !password) || (submit && !valid) ? 'input--error' : ''}
											onChange={ e => setPassword(e.target.value) }
										/>
										{ submit && !password &&
											<p className="text--error modal-label__error">Поле Пароль не может быть пустым</p>
										}
									</div>
									{ submit && !valid && login && password &&
										<p className="modal-content__error text--error">
											Неверный логин/пароль
										</p>
									}
									<div className="modal-content__field">
										<label className="modal-label">
											<span className="modal-label__checkbox">
												<input type="checkbox" className="modal-label__input" />
												<CheckboxIcon />
											</span>
											<span>Принимаю условия пользовательского соглашения</span>
										</label>
									</div>
									<div className="modal-content__field">
										<button type="submit">
											Войти
										</button>
									</div>
									<div className="modal-footer">
										<span className="modal-footer__link link">
											Забыли пароль?
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.getElementById("root")
	)
}

export default SignupPopup
