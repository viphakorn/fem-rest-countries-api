import Link from "next/link"

const PageNotFound = () => {
 return (
  <main className="page-not-found">
   <h1>404 | Page Not Found</h1>
   <Link href={"/"}>
    <a className="back-btn">Home</a>
   </Link>
  </main>
 )
}

export default PageNotFound
