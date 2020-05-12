import React, { useState } from "react"

export const EnvironmentContext = React.createContext()

export function EnvironmentProvider(props) {
  const { children } = props
  const [scene, setScene] = useState()

  const providerValue = { scene, setScene }

  return (
    <EnvironmentContext.Provider value={providerValue}>
      {children}
    </EnvironmentContext.Provider>
  )
}
