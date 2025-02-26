import React from "react"
import ReactLoading from 'react-loading'
import { useOutletContext } from "react-router-dom"
import { loadProcessNews } from "../../../services/firebase/firebase-firestore"
import styled from "styled-components"
import ProcessNewsList from "../../components/ProcessNewsList"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    // align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em 0; 
`

const BoldGreenMessage = styled.h2`
    color: #008442;
    font-weight: bold;
    padding: 0 1em;
    margin: 2em;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }   
`

export default function ProcessNews() {
    const [news, setNews] = React.useState([])

    const { selectionProcess } = useOutletContext()

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function loadData() {
            const news = await loadProcessNews(selectionProcess.id)
            setNews(news)
            setLoading(false)
        }
        loadData()
    }, [selectionProcess])

    console.log("ProcessNews.jsx - selectionProcess: ", selectionProcess)
    console.log("ProcessNews.jsx - news: ", news)

    if(loading){
        return (
            <LoaderContainer>
                <ReactLoading 
                    type={"spinningBubbles"}
                    color={"#008442"}
                    height={"10%"}
                    width={"10%"}
                />
            </LoaderContainer>
        )
    }

    return (
        <>
            { !loading && news.length === 0 ? (
                <BoldGreenMessage>NÃO HÁ ATUALIZAÇÕES SOBRE ESSE PROCESSO SELETIVO</BoldGreenMessage>
            ) : (
                    <ProcessNewsList news={news} />
                )
            }
        </>
    )
}