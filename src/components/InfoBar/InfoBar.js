import React from 'react'
import onlineIcon from "../../icons/laptop.png"
import closeIcon from "../../icons/close.png"
import './InfoBar.css'

export default function InfoBar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="close icon"/>
                </a>
            </div>
        </div>
    )
}
