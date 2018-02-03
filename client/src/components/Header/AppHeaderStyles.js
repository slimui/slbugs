import styled from 'styled-components'

export const ProjectName = styled.div`
	font-size: 24px;
	font-weight: 400;
	width: 33%;
	text-align: center;
`
export const HeaderItems = styled.div`
	width: 33%;
`

export const Holder = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	align-items: center;
	justify-content: space-around;
`
export const Header = styled.div`
	padding: 10px;
	display: flex;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: white;
	user-select: none;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const UserName = styled.div`
	padding: 10px;
`
export const LogoutSection = styled.div`
	align-items: center;
	height: 20px;
	width: 20px;
	border: 0.5px solid grey;
	border-radius: 2px;
	:hover {
		background-color: blue;
	}
`
export const User = styled.div`
	display: flex;
	width: 33%;
	height: 100%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding-right: 10px;
`

export const NoProjects = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	height: 100%;
`
