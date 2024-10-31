import { useEffect } from "react"

const LandingPage = () => {
    useEffect(() => {
        document.title = "Mylo Asset Management"
    }, [])
  return (
    <div>LandingPage</div>
  )
}

export default LandingPage