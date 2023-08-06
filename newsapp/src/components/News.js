import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import demo from'./demo'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
  }

static propTypes= {
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
    constructor(){
        super();//constructor runs only when this class obj is called
        // console.log("constructor aagaya bhai newscomponent sey")
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
      console.log("cdm");
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3382657e1bce4e58b7c0df9ccd308f65&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData=await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false})
  }
    handlePrevClick= async ()=>{
      console.log("Previous");
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3382657e1bce4e58b7c0df9ccd308f65&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true}); 
      let data = await fetch(url);
      let parsedData=await data.json();
      console.log(parsedData);
      this.setState({
        page:this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      }) 
    }

     handleNextClick = async ()=>{
      console.log("Next");
      if(!this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3382657e1bce4e58b7c0df9ccd308f65&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true})
      let data = await fetch(url);
      let parsedData=await data.json();
      // console.log(parsedData);
      this.setState({
        page:this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      })
    }
  }


  render() {
      console.log("render");
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'30px'}}>UpdateMeUp - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url}/>
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
          {/* disable prev button at page 1 */}
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} class="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} class="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News