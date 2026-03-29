import React, { useState } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import Card from '../components/ui/Card';
import { Send, Search, MoreVertical, Paperclip } from 'lucide-react';

const ContactItem = ({ contact, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 flex items-center gap-4 cursor-pointer transition-all border-b border-[#2A2A2A]/30 ${
      active ? 'bg-[#1A1A1A] border-l-2 border-l-[#00FF85]' : 'hover:bg-[#111111]/50'
    }`}
  >
    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white font-bold text-xs">
      {contact.name?.[0]}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h4 className="text-white text-[14px] font-bold truncate">{contact.name}</h4>
        <span className="text-[#888888] text-[10px] uppercase tracking-wider">{contact.time}</span>
      </div>
      <p className="text-[#888888] text-[12px] truncate">{contact.lastMsg}</p>
    </div>
    {contact.unread && (
      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF85] shadow-[0_0_5px_#00FF85]" />
    )}
  </div>
);

const MessageBubble = ({ msg, isMe }) => (
  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[80%] p-3 rounded-[12px] text-[14px] leading-relaxed ${
      isMe ? 'bg-[#00FF85] text-[#000] rounded-tr-none' : 'bg-[#1A1A1A] text-white rounded-tl-none border border-[#2A2A2A]'
    }`}>
      {msg.text}
      <div className={`text-[10px] mt-1 ${isMe ? 'text-[#000]/60' : 'text-[#888888]'}`}>
        {msg.time}
      </div>
    </div>
  </div>
);

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');

  const contacts = [
    { id: 1, name: 'Sarthak Gupta', lastMsg: 'The tech stack looks solid. Let\'s sync.', time: '2:15 PM', unread: true },
    { id: 2, name: 'Zepto (Founder)', lastMsg: 'Sent you the intern offer letter.', time: 'Yesterday', unread: false },
    { id: 3, name: 'Riya Sen', lastMsg: 'Shared the growth strategy deck. Check it out.', time: 'Monday', unread: false },
    { id: 4, name: 'TUC Admin', lastMsg: 'Your Gauntlet score was exceptional.', time: '2d ago', unread: false },
  ];

  const chatHistory = [
    { text: 'Hey Sarthak! Checked out your profile on Find Co-founder.', time: '2:00 PM', isMe: true },
    { text: 'Yo! Thanks for reaching out. Building anything cool currently?', time: '2:05 PM', isMe: false },
    { text: 'Yeah, working on an AI-driven logistics layer for SMEs. Saw you specialize in Go/Rust.', time: '2:08 PM', isMe: true },
    { text: 'The tech stack looks solid. Let\'s sync.', time: '2:15 PM', isMe: false },
  ];

  return (
    <DashboardLayoutV2>
      <div className="h-[calc(100vh-160px)] flex bg-[#111111]/30 rounded-xl border border-[#2A2A2A] overflow-hidden">
        {/* Sidebar */}
        <div className="w-[320px] flex flex-col border-r border-[#2A2A2A]">
          <div className="p-4 border-b border-[#2A2A2A]">
            <h2 className="text-white text-[18px] font-bold mb-4 uppercase tracking-widest">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white py-2 pl-10 pr-4 rounded-lg outline-none focus:border-[#00FF85] transition-all text-xs"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[#2A2A2A]/30">
            {contacts.map(c => (
              <ContactItem 
                key={c.id} 
                contact={c} 
                active={activeChat === c.id} 
                onClick={() => setActiveChat(c.id)} 
              />
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-[#0A0A0A]/50">
          {/* Header */}
          <div className="p-4 border-b border-[#2A2A2A] flex justify-between items-center bg-[#111111]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#00FF85] font-bold text-xs uppercase">
                {contacts.find(c => c.id === activeChat)?.name?.[0]}
              </div>
              <div>
                <h3 className="text-white text-[15px] font-bold">{contacts.find(c => c.id === activeChat)?.name}</h3>
                <div className="flex items-center gap-1.5 text-[#00FF85] text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-1 h-1 rounded-full bg-[#00FF85]" />
                  Online
                </div>
              </div>
            </div>
            <button className="text-[#888888] hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="text-center mb-8">
                <span className="bg-[#1A1A1A] text-[#888888] px-4 py-1 rounded-full text-[10px] uppercase tracking-widest border border-[#2A2A2A]">
                    March 24, 2026
                </span>
            </div>
            {chatHistory.map((msg, i) => (
              <MessageBubble key={i} msg={msg} isMe={msg.isMe} />
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#2A2A2A] bg-[#111111]/50">
            <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2 focus-within:border-[#00FF85] transition-all group">
              <button className="text-[#888888] hover:text-white transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-white py-2 outline-none text-[14px]"
              />
              <button 
                className={`p-2 rounded-lg transition-all ${
                  messageText.trim() ? 'bg-[#00FF85] text-[#000]' : 'text-[#888888]'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutV2>
  );
};

export default Messages;
