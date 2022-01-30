import * as React from 'react'

function Loading() {
	return (
		<div className="loader-wrap">
			<div className="loader-blur"/>
			<div className="loading">
				<div className="arc"/><div className="arc"/><div className="arc"/>
			</div>
		</div>
	)
}

export default Loading
