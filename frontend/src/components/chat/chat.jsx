import style from './chat.module.css'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { sendMessageToAI } from '../../services/api';

export function Chat() {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [files, setFiles] = useState([]);

    async function getFiles(e) {
        setFiles(prev => [...prev, e.target.files]);

        console.log(files)
    }

    async function sendMessage(e) {
        if (message === '') return;

        e.preventDefault();

        setMessageHistory(prev => [...prev, {sender: 'human', message}]);

        const { content } = await sendMessageToAI(message)

        setMessageHistory(prev => [...prev, {sender: 'ai', message: content}]);

        setMessage('');
    }

    return (
        <div id={style.chatContainer}>
            <div className={style.chatContainerMessage}>
                {messageHistory.map((message, idx) => {
                    return(
                        <div className={style.chatDivMessage} key={idx}>
                            {message.sender === 'human' ? <Avatar alt="Human" src="/images/human.png"/> 
                            : <Avatar alt="AI" src="images/bot.png"/> }
                            <div className={style.chatMessage}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
                })}
            </div> 
            <div  className={style.divInputs}>
                <IconButton className={style.attachButton} onClick={() => document.querySelector('.inputFile').click()}>
                    <AttachFileIcon className={style.chatIconButton}/>
                </IconButton>
                <input 
                    type="text" 
                    className={style.chatMessageInput} 
                    placeholder="Enviar mensagem" 
                    onChange={e => {setMessage(e.target.value)}}
                    value={message}
                />
                <IconButton className={style.chatSendButton} onClick={sendMessage}>
                    <SendIcon className={style.chatIconButton}/>
                </IconButton>
                <input 
                    class="inputFile" 
                    type="file" 
                    style={{display: 'none'}}
                    multiple 
                    onClick={getFiles}
                />
            </div>
        </div>
    );
}