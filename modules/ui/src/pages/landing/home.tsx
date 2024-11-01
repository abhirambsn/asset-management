import { useEffect } from "react"

const LandingPage = () => {
    useEffect(() => {
        document.title = "Mylo Asset Management"
    }, [])
  return (
    <section>
      <h1>Landing Page</h1>
    </section>
  )
}

export default LandingPage