import React from "react";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <h2>header</h2>
            {props.children}
            <h2>footer</h2>
        </div>
    )
}