import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar';
import InputComponent from '../InputComponent/InputComponent';
import Messages from '../Messages/Messages';
import './Chat.css'


let socket;

export default function Chat({ location }) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const ENDPOINT = 'https://chat-room-app-react.herokuapp.com/'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {

        });


        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages  messages={messages} name={name}/>
                <InputComponent message={message} setMessage={setMessage} sendMessage={sendMessage}/>


            </div>
        </div>
    )
}
