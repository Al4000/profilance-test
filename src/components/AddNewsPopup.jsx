import * as React from 'react'
import ReactDOM from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNews, setNewsAddOpen } from '../redux/actions/news'
import { CSSTransition } from 'react-transition-group'

function AddNewsPopup({ isOpen }) {
	const dispatch = useDispatch()
	const [submitAdd, setSubmitAdd] = useState(false)
	const [titleNews, setTitleNews] = useState('')
	const [textNews, setTextNews] = useState('')
	const nodeRef = useRef(null)
	const input = useRef(null)

	const closeDialog = () => {
		dispatch(setNewsAddOpen(false))
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

	const handleAddNews = (e) => {
		e.preventDefault()
		setSubmitAdd(true)

		if (titleNews && textNews) {
			dispatch(setNewsAddOpen(false))
			const date = new Date()
			const month = date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1
			const currentDate = `${date.getDate()}-${month}-${date.getFullYear()}`
			const newsItem = {
				title: titleNews,
				description: textNews,
				urlToImage: '',
				publishedAt: currentDate,
				confirmed: false
			}
			dispatch(addNews(newsItem))

			// reset to init after close popup
			setTimeout(() => {
				setTitleNews('')
				setTextNews('')
			}, 500)
		}
	}

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
						<h2 className="modal-title">Добавить новость</h2>
						<div className="modal-content">
							<div className="modal-content__inner">
								<form onSubmit={ handleAddNews }>
									<div className="modal-content__field">
										<input
											type="text"
											placeholder="Заголовок новости"
											className={ submitAdd && !titleNews ? 'input--error' : '' }
											ref={ input }
											onChange={ e => setTitleNews(e.target.value) }
										/>
										{ submitAdd && !titleNews &&
											<p className="text--error modal-label__error">Поле Заголовок не может быть пустым</p>
										}
									</div>
									<div className="modal-content__field">
										<textarea
											rows="3"
											placeholder="Текст новости"
											className={submitAdd && !textNews ? 'input--error' : ''}
											onChange={ e => setTextNews(e.target.value) }
										/>
										{ submitAdd && !textNews &&
											<p className="text--error modal-label__error">Поле Текст новости не может быть пустым</p>
										}
									</div>
									<div className="modal-content__field">
										<button type="submit">
											Отправить на модерацию
										</button>
									</div>
									<div className="modal-footer" />
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

export default AddNewsPopup
