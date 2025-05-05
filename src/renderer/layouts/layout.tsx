import React from 'react'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <>
            <div>layout</div>
            <Outlet />

        </>

    )
}

export default layout