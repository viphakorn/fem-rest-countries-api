import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

class MyDocument extends Document {
 static async getInitialProps(ctx: DocumentContext) {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
 }

 render() {
  return (
   <Html lang="en">
    <Head>
     <meta charSet="UTF-8" />
     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
     <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
     <link href={"https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"} rel="stylesheet"></link>
    </Head>
    <body>
     <Main />
     <NextScript />
    </body>
   </Html>
  )
 }
}

export default MyDocument
