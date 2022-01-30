import * as React from 'react'

function Main({ login }) {
	return (
		<main>
			<div className="wrapper">
				<div className="container container--sm">
					<h1>Привет, { login }!</h1>
				</div>
			</div>
		</main>
	)
}

export default Main
