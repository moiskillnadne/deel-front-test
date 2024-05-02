import { useCallback, useEffect, useState } from "react"
import { BACKEND_URL } from "../constants"
import { TabTitle } from "../shared/TabTitle"

export const NewsWidget = () => {
  const [bestProfession, setBestProfession] = useState(null)
  const [bestClients, setBestClients] = useState([])

  const fetchBestProfession = useCallback(async (startDate, endDate) => {
    const response = await fetch(`${BACKEND_URL}/admin/best-profession?start=${startDate}&end=${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const json = await response.json()

    setBestProfession(json)
  }, [])

  const fetchBestClients = useCallback(async (startDate, endDate, limit) => {
    const response = await fetch(`${BACKEND_URL}/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    setBestClients(json)
  }, [])

  useEffect(() => {
    const startDate = '2020-01-1'
    const endDate = '2021-1-1'

    fetchBestProfession(startDate, endDate)
    fetchBestClients(startDate, endDate, 2)
    // Should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <TabTitle value='News'/>

      <div>

        {bestProfession && (
          <div>
            <h3>Best Profession - Deel Rating</h3>
            <div>The best profession for 2021 year. These guys earned a lot of money. The best profession is <strong>{bestProfession.profession}</strong> with <strong>revenue {bestProfession.totalAmount} DeelCoins</strong></div>
          </div>
        )}
        <div>
          <h3>Best Clients - Deel Rating</h3>
          <div>
            <ol>
              {bestClients.map((client) => {
                return (
                  <li key={client.id}>{client.fullName} paid {client.paid} DeelCoins</li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}