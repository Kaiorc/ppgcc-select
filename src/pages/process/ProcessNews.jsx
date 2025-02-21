import React from "react"
import ReactLoading from 'react-loading'
import { useOutletContext } from "react-router-dom"
// import { loadProcessNews } from "../../../services/firebase/firebase-firestore"
// import { getProcessNews } from "../../../services/firebase/firebase-firestore"
import DOMPurify from "dompurify"
import styled from "styled-components"
import { loadProcess } from "../../../services/firebase/firebase-firestore"
// import ProcessNewsList from "../../components/ProcessNewsList"

export default function ProcessNews() {
    const [news, setNews] = React.useState([])

    // const { selectionProcess } = useOutletContext()

    const [loading, setLoading] = React.useState(true)

    // React.useEffect(() => {
    //     // // try {
    //     // //     const news = getProcessNews(selectionProcess.id)
    //     // //     if (news) {
    //     // //         setNews(news)
    //     // //         setLoading(false)
    //     // //     }
    //     // // } catch (error) {
    //     // //     console.log("Erro ao carregar notícias do processo: ", error)
    //     // // }
    //     async function loadData() {
    //         const news = await loadProcessNews(selectionProcess.id)
    //         setNews(news)
    //         setLoading(false)
    //     }
    //     loadData()
    // }, [selectionProcess])

    // console.log("ProcessNews.jsx - selectionProcess: ", selectionProcess)
    // console.log("ProcessNews.jsx - news: ", news)

    return (
        <h1>ATUALIZAÇÕES DO PROCESSO</h1>
        // <>
        //     { loading ? (
        //         <LoaderContainer>
        //             <ReactLoading 
        //                 type={"spinningBubbles"}
        //                 color={"#008442"}
        //                 height={"10%"}
        //                 width={"10%"}
        //             />
        //         </LoaderContainer>
        //     ) : (
        //             <>
        //                 <ProcessNewsList news={news} />
        //             </>
        //         )
        //     }
        // </>
    )
}