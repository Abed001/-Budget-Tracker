
  import { useEffect, useState } from 'react'
  import axios from 'axios'
function Dashboard() {

  const [data, setData] = useState([])

  useEffect(() => {
    // This calls your backend at port 3001
    axios.get('http://localhost:3001/api/transactions')
      .then(response => {
        console.log("Backend Data Received:", response.data)
        setData(response.data)
      })
      .catch(error => console.error("Bridge Error:", error))
  }, [])

  return (
    <div>
      <h1>Check Console for Data</h1>
      <ul>
        {data.map((t) => (
          <li key={t.id || t._id}>
            <strong>{t.title}</strong>: 
            <span style={{ color: t.type === 'income' ? 'green' : 'red' }}>
               {t.type === 'income' ? ' +' : ' -'}${t.amount}
            </span> 
            ({t.date})
          </li>
        ))}
      </ul>
     
    </div>
  )
}
 


export default Dashboard