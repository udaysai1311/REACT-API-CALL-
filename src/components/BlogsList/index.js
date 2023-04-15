import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoader: true}

  componentDidMount = () => {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachItem => ({
      // changing snake_case naming convention to camel case as Backend stores data as snake_case  and front-end stores data as camel case
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: updatedData})
    this.setState(prevState => ({isLoader: !prevState.isLoader}))
  }

  render() {
    const {blogsData, isLoader} = this.state
    return (
      <div className="blog-list-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
