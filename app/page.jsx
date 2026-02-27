import Banner from '@/components/Banner'
import Blogs from '@/components/Blogs'
import Bookreview from '@/components/Bookreview'
import Buybook from '@/components/Buybook'
import Hero from '@/components/Hero'
import Imggallery from '@/components/Imggallery'
import Post from '@/components/Post'
import Subscribe from '@/components/Subscribe'
import React from 'react'

const page = () => {
  return (
    <>

      <Hero />
      <Post />
      <Banner />
      <Bookreview />
      <Buybook />
      {/* <Blogs /> */}
      {/* <Subscribe />
      <Imggallery /> */}



    </>
  )
}

export default page