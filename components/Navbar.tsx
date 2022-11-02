/* eslint-disable @next/next/no-img-element */
import { useTheme } from "next-themes"
import { FC } from "react"

const Navbar: FC = () => {
 const { resolvedTheme, setTheme } = useTheme()
 let srcMoon
 switch (resolvedTheme) {
  case "light":
   srcMoon = "icons/moon-outline.svg"
   break
  case "dark":
   srcMoon = "icons/moon.svg"
   break
  default:
   srcMoon = "icons/moon-outline.svg"
   break
 }
 return (
  <header className="primary-header">
   <nav className="navbar container">
    <h1 className="logo">Where in the world?</h1>
    <button className="theme-switch" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
     <img src={srcMoon} alt="" />
     Dark Mode
    </button>
   </nav>
  </header>
 )
}

export default Navbar
