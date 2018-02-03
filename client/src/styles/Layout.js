import styled from 'styled-components'

export default styled.div`
	display: grid;
	height: 100vh;
	grid-template-rows: 60px 1fr auto;
	animation: fadein 0.1s;
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`
