import React, { useEffect, useRef, useState } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';

export default function Chat(){
  const [messages, setMessages] = useState([{id:1,role:'bot',text:'Hello Joseph — NeuroEdge here.'}]);
  const cont = useRef();
  useEffect(()=> cont.current?.scrollTo({top: cont.current.scrollHeight}), [messages]);

  const onSend = (text, {files, reply}) => {
    setMessages(m=> [...m, {id:Date.now(), role:'user', text}]);
    setTimeout(()=> setMessages(m=> [...m, {id:Date.now()+1, role:'bot', text: reply || 'NeuroEdge reply (mock)'}]), 900);
  };

  return (
    <div style={{padding:12}}>
      <div ref={cont} className='chat-stage'>{messages.map(m=> <MessageBubble key={m.id} m={m} />)}</div>
      <ChatInput onSend={onSend} />
    </div>
  )
}
