import styled from 'styled-components'

export const BugContainer = styled.div`
	margin: 2px;
	background-color: white;
	display: flex;
	flex-direction: row;
	:hover {
		cursor: pointer;
	}
`
export const BugListContainer = styled.div`
	animation: fadein 0.2s;
	width: 60%;
	padding-top: 5%;
	margin: 0 auto;
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
export const NoBugs = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
`

export const Container = styled.div``

export const BugIcon = styled.div`
	align-items: center;
	justify-content: center;
	width: 10%;
	text-align: center;
	margin: auto 0;
`

export const BugContent = styled.div`
	width: 70%;
`

export const BugName = styled.div`
	font-size: '14px';
	font-weight: bold;
	padding: 4px;
`

export const BugDescription = styled.div`
	font-size: '12px';
	font-weight: lighter;
	word-wrap: break-word;
	width: 100%;
	padding: 4px;
`

export const BugStatus = styled.div`
	align-items: center;
	justify-content: center;
	width: 10%;
	text-align: center;
	margin: auto 0;
`
