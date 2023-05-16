import BlogPost from '@/components/homepageComponents/BlogPost'
import Brands from '@/components/homepageComponents/Brends'
import Description from '@/components/homepageComponents/Description'
import Footer from '@/components/homepageComponents/Footer'
import Header from '@/components/homepageComponents/navbar_header/Header'
import NewProdSlider from '@/components/homepageComponents/NewProdSlider'
import TopSlider from '@/components/homepageComponents/TopSlider'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopSlider/>
      <BlogPost/>
      <NewProdSlider/>
      <Description/>
      <Brands/>
    </>
  )
}
