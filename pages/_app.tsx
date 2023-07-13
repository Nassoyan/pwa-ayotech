import "@/styles/globals.scss";
import "@/styles/header.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/newProductSlider.scss";
import "@/styles/description.scss";
import "@/styles/toppslider.scss";
import "@/styles/login.scss";
import "@/styles/register.scss";
import "@/styles/wishlist.scss";
import "@/styles/footer.scss";
import "@/styles/auth.scss";
import "@/styles/brends.scss";
import "@/styles/addToCart.scss";
import "@/styles/getCart.scss";
import "@/styles/menuItems.scss";
import "@/styles/product.scss";
import "@/styles/productId.scss";
import "@/styles/crosSellers.scss";
import "@/styles/paginate.scss";
import "@/styles/blogPost.scss"
import "@/styles/scrollPopUp.scss"



import type { AppProps } from "next/app";
import { store } from "@/redux/features/store";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
 
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
