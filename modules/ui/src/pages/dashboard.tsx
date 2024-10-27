import { useParams } from "react-router-dom"

const DashboardPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <section>
        <h1>Dashboard</h1>
    </section>
  )
}

export default DashboardPage