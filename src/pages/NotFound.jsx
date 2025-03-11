import React from "react"
import { Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import Button from "../components/Button"

const fadein = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0.2;
	}
`

const slidedown = keyframes`
	0% {
		transform: translateY(200px); /* 200px ≈ 12.5rem */
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const slideup = keyframes`
	0% {
		transform: translateY(200px); /* 200px ≈ 12.5rem */
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 1.25rem;
	position: relative;
`

const Title = styled.h1`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #008442;
	font-size: 40rem; 
	font-weight: 900;
	animation: ${fadein} 0.8s ease-out 1.5s forwards;
	opacity: 0;

	@media (min-width: 1440px) { 
		top: 0;
		font-size: 32rem; /* 200px */
	}

	@media (max-width: 1200px) { /* 1200px */
		top: 6%;
		font-size: 20rem; /* 200px */
	}

	@media (max-width: 768px) { /* 768px */
		top: 15%;
		font-size: 15rem; /* 150px */
	}

	@media (max-width: 480px) { /* 480px */
		top: 30%;
		font-size: 10rem; /* 100px */
	}
`

const Subtitle = styled.h2`
	color: #008442;
	font-size: 3rem;
	font-weight: 700;
	margin-bottom: 6.25rem;
	animation: ${slidedown} 1s ease-out 0.5s forwards;
	transform: translateY(-12.5rem); /* 200px */
	opacity: 0;
	text-transform: uppercase;

	@media (max-width: 1200px) {
		font-size: 2.25rem; /* 36px */
	}
	@media (max-width: 768px) {
		font-size: 1.75rem; /* 28px */
		margin-bottom: 3.125rem; /* 50px */
	}
	@media (max-width: 480px) {
		font-size: 1.5rem; /* 24px */
		margin-bottom: 1.875rem; /* 30px */
	}
`

const ReturnButton = styled(Button)`
	display: inline-block;
	padding: 1.25rem 2.5rem; /* 20px 40px */
	color: white;
	text-decoration: none;
	border-radius: 62.5rem; /* 999px ≈ 62.5rem */
	font-size: 1.75rem; /* 28px */
	transition: 0.4s ease-out;
	animation: ${slideup} 1s ease-out 0.5s forwards;
	transform: translateY(12.5rem); /* 200px */
	opacity: 0;

	&:hover {
		box-shadow: 0.375rem 0.375rem rgba(0, 0, 0, 0.3); /* 6px */
	}

	@media (max-width: 768px) {
		padding: 0.9375rem 1.875rem; /* 15px 30px */
		font-size: 1.5rem; /* 24px */
	}
	@media (max-width: 480px) {
		padding: 0.625rem 1.25rem; /* 10px 20px */
		font-size: 1.25rem; /* 20px */
	}
`

export default function NotFound() {
	return (
		<Container>
			<Title>404</Title>
			<div>
				<Subtitle aria-label="Página não encontrada">
					Você se perdeu, volte antes que esqueça o caminho!
				</Subtitle>
				<Link to="/" aria-label="Voltar para a tela inicial">
					<ReturnButton type="button">
						IR PARA A TELA INICIAL
					</ReturnButton>
				</Link>
			</div>
		</Container>
	)
}