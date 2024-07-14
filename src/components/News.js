import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

   
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
  
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updatenews =  async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page}`;
        props.setProgress(20);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(40);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(80);
        setLoading(false);
        props.setProgress(100);
        
        }


    useEffect(() => {
        document.title = `WhatsNews-${capitalizeFirstLetter(props.category)}`;
        updatenews();
        //eslint-disable-next-line
    }, []);



    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}&page=${page + 1}`;
        setPage(page+1);
        setLoading(true);
        props.setProgress(50);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
        setLoading(false);
        

    }


    console.log("render");
    return (
        <div className='container my-4'>
            <h2 className='newstitles'>{`Top Headlines ${capitalizeFirstLetter(props.category)}`}</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading && <Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem
                                    title={element.title}
                                    description={element.description ? element.description : ""}
                                    image={element.urlToImage} newsUrl={element.url}
                                    newsurl={element.url}
                                    author={element.author}
                                    publishedAt={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>


    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general'

}

News.propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News;