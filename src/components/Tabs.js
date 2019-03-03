import React, { useState } from 'react'

export const Tab = props => {
    const { visible, children } = props

    return visible ? children : null
}

export const Tabs = props => {
    const { children, initiaTab } = props
    const [ visibleTab, setVisibleTab ] = useState(initiaTab)

    return children(visibleTab, setVisibleTab)
}
