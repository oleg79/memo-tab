import React, { createContext, useState, useContext } from 'react'

const TabsContext = createContext({
  currentTab: '',
  setCurrentTab: () => {}
})

export const Tabs = props => {
  const { initiaTab, children } = props
  const [ currentTab, setCurrentTab ] = useState(initiaTab)

  return (
    <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
      { children }
    </TabsContext.Provider>
  )
}

export const Tab = props => {
  const { name, children } = props
  const { currentTab, setCurrentTab } = useContext(TabsContext)

  return (
    <div
      className={`${name === currentTab ? 'active' : ''}`}
      onClick={() => setCurrentTab(name)}
    >
      { children }
    </div>
  )
}

export const ContentTab = props => {
  const { name, children } = props
  const { currentTab } = useContext(TabsContext)

  return name === currentTab ? children : null;
}