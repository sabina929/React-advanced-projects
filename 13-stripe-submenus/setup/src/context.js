import React, { useState, useContext, createContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const [page, setPage] = useState({page:'', links: []})
    const [location, setLocation] = useState({})
    
    const openSidebar = () => {
        setIsSidebarOpen(true)
    }
    
    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }
    const openSubmenu = (text, coordinates) => {
        const page = sublinks.find(link => link.page === text)
        setPage(page)
        setLocation(coordinates)
        setIsSubmenuOpen(true)
    }
    
    const closeSubmenu = () => {
        setIsSubmenuOpen(false)
    }

    return (
        <AppProvider.Provider value={{
            isSidebarOpen,
            openSidebar,
            closeSidebar,
            isSubmenuOpen,
            openSubmenu,
            closeSubmenu,
            page,
            location,
        }}>
            {children}
        </AppProvider.Provider>
    )

}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}
