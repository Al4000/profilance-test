import * as React from 'react'
import { useEffect, useState } from 'react'
import { setNewsAddOpen } from '../redux/actions/news'
import { useDispatch, useSelector } from 'react-redux'
import NewsItem from '../components/NewsItem'
import AddNewsPopup from '../components/AddNewsPopup'
import PlusIcon from '../components/icons/PlusIcon'

function News({ isAdmin, isAuth, news }) {
	const dispatch = useDispatch()
	const { newsAddPopupOpen } = useSelector(({ news }) => news)
	const [searchNews, setSearchNews] = useState([])
	const [searchInput, setSearchInput] = useState([])

	// search news
	const handleSearch = (e) => {
		setSearchInput(e.target.value.toLowerCase())
	}
	useEffect(() => {
		const filteredNews = news.length ? news.filter(item => {
			return item.title.toLowerCase().includes(searchInput) || item.description.toLowerCase().includes(searchInput)
		}) : {}
		setSearchNews(filteredNews)
	}, [searchInput, news])

	// open popup
	const openNewsAddHandler = () => {
		dispatch(setNewsAddOpen(true))
	}

	return (
		<div>
			<div className="wrapper">
				<div className="container container--md">
					<h1>Новости</h1>
					<div className="news-tools">
						<div className="search-input">
							<input type="text" placeholder="Поиск новости.." 	onChange={ handleSearch } />
						</div>
						{ isAuth &&
							<div className="news-button--add">
								<button onClick={ openNewsAddHandler }>
									Добавить новость
									<PlusIcon />
								</button>
							</div>
						}
					</div>
					<div className="news-container">
						{ !!searchNews.length && searchNews.map((card, index) => (
							isAdmin
								? <NewsItem card={ card } isAdmin={ isAdmin } key={ index } id={ index } />
								: card.confirmed && <NewsItem card={ card } isAdmin={ isAdmin } key={ index } id={ index } />
							))
						}
						{ searchInput.length && !searchNews.length &&
							<h3>
								Не найдено ни одной новости :(
							</h3>
						}
					</div>
				</div>
			</div>

			<AddNewsPopup isOpen={ newsAddPopupOpen } />
		</div>
	)
}

export default News
