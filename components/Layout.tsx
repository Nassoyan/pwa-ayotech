import { ReactNode, useEffect } from 'react';
import Footer from './homepageComponents/Footer'
import Header from './homepageComponents/Header'
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter()

  useEffect(() => {
    const bodyHeight = document.body.scrollHeight
    const windowHeight = window.innerHeight

    const footer = document.querySelector(".footer_wrapper")
    if (bodyHeight < windowHeight) {
      footer?.classList.add("layout_footer")
    } else {
      footer?.classList.remove("layout_footer")
    }
  }, [children])

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
        </>
      )
  }
}
