import style from './chat.module.css'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';

export function Chat() {
    const [message, setMessage] = useState('');
    const [aiMessage, setAiMessage] = useState('');

    function setMessageValue(e) {
        setMessage(e.target.value);

        console.log(message)
    }

    function sendMessage(e) {
        e.preventDefault();
        
        const response = axios({
            method: 'post',
            url: 'http://localhost:8000/chat',
            data: {
                message: message
            }
        })

        response.then((res) => {
            const aiMessage = res.data.content

            setAiMessage(aiMessage);
        }).catch((err) => {
            console.log(err);
        });

        console.log('getMessages');
    }

    return (
        <div id={style.chatContainer}>
            <div className={style.chatContainerMessage}>
                <div className={style.chatDivMessage}>
                    <Avatar alt="AI" src="/static/images/avatar/1.jpg" />
                    <div className={style.chatMessage}>
                        <p>{aiMessage}</p>
                    </div>
                </div>
            </div>
            <Paper className={style.divInputs} elevation={2}>
                <input type="text" className={style.chatMessageInput} placeholder="Type a message..." onChange={setMessageValue}/>
                <IconButton className={style.chatSendButton} onClick={sendMessage}>
                    <SendIcon className={style.chatIconButton}/>
                </IconButton>
            </Paper>
        </div>
    );
}