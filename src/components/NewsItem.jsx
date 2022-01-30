import * as React from 'react'
import { useDispatch } from 'react-redux'
import { confirmNews, deleteNews, setLoaded } from '../redux/actions/news'
import newsImg from '../assets/404.jpg'
import CheckIcon from './icons/CheckIcon'
import DeleteIcon from './icons/DeleteIcon'

function NewsItem({ card, isAdmin, id }) {
	const dispatch = useDispatch()
	const handleConfirm = () => {
		dispatch(confirmNews(id))
	}
	const handleDelete = () => {
		dispatch(setLoaded(false))
		dispatch(deleteNews(id))
	}

	return (
		<div className="news-item">
			<div className="news-item__inner">
				<img className="news-item__img" src={ card.urlToImage ? card.urlToImage : newsImg } alt=""/>
				<div className="news-item__header">
					<span className="news-item__subtitle">{ "Дата публикации: " + card.publishedAt }</span>
				</div>
				<div className="news-item__content">
					<h2>{ card.title }</h2>
					<p>{ card.description }</p>
				</div>
				{ isAdmin &&
					<div className="news-item__footer">
						<div className="news-item__button">
							{ !card.confirmed &&
								<button className="button--success" onClick={ handleConfirm }>
									<CheckIcon />
									Одобрить
								</button>
							}
						</div>
						<div className="news-item__button">
							<button className="button--error" onClick={ handleDelete }>
								Удалить
								<DeleteIcon />
							</button>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default NewsItem
