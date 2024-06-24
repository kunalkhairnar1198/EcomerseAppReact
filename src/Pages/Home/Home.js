import React from 'react'
import Layout from '../../Component/Layout/Layout'
import Carousel from '../../Component/Carousel/Carousel'
import Category from '../../Component/HomeProducts/Category/Category'
import HomepageProductcard from '../../Component/HomeProducts/HomepageProduct/HomepageProductcard'

const Home = () => {
  return (
    <Layout>
      <Carousel/>
      <Category/>
      <HomepageProductcard/>
    </Layout>
  )
}

export default Home
