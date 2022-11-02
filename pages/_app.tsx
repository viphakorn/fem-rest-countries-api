import "styles/globals.scss"
import type { AppProps } from "next/app"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "next-themes"

function MyApp({ Component, pageProps }: AppProps) {
 return (
  <ThemeProvider enableSystem={false}>
   <Navbar />
   <Component {...pageProps} />
  </ThemeProvider>
 )
}

export default MyApp
