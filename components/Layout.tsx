import { ReactNode, useEffect } from 'react';
import Footer from './homepageComponents/Footer'
import Header from './homepageComponents/navbar_header/Header'
import { useRouter } from 'next/router';
import ScrollPopUp from './ScrollPopUp';
import { useAppSelector } from '@/redux/features/hooks';
import { RootState } from '@/redux/features/store';
import Cookies from 'js-cookie';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter()
  const barearToken = Cookies.get("authorized");
  
  const data = useAppSelector((state: RootState) => state.getCart.data?.items);
  
  // useEffect(() => {
  //   const bodyHeight = document.body.scrollHeight
  //   const windowHeight = window.innerHeight

  //   const footer = document.querySelector(".footer_wrapper")
  //   if (bodyHeight < windowHeight) {
  //     footer?.classList.add("layout_footer")
  //   } else {
  //     footer?.classList.remove("layout_footer")
  //   }
  // }, [children])

  function ScrollPopup() {
    switch (router.pathname) {
      case "/cart":
      case "/product":
        return false
      default:
        return <ScrollPopUp/>;
    }
  }

  switch (router.pathname) {
    case '/register':
    case '/verifyYourEmail':
    case '/changepassword':
    case '/forgotPassword':
    case '/create-new-password':
      return <>{children}</>;
    default:
      return (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
          {data?.length && barearToken && ScrollPopup()}
        </>
      )
  }
}
