"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Phone, Search, Plus, Bell, MoreHorizontal } from "lucide-react";
import Image from "next/image";

// --- [1. UI 컴포넌트 수정됨] ---
const Card = ({ children, className }: any) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`border rounded px-3 py-2 w-full ${props.className}`}
    {...props}
  />
);

const Button = ({ children, className, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors bg-[#5CA0FF] text-white hover:bg-blue-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Avatar = ({ children, className }: any) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
  >
    {children}
  </div>
);

// ✅ [수정 포인트] fill 속성을 추가하여 부모 크기에 맞게 자동 조절되도록 수정
const AvatarImage = (props: any) => {
  const { src, alt, className } = props;
  return (
    <Image 
      src={src} 
      alt={alt || "Avatar"} 
      fill 
      className={`object-cover ${className || ""}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

const AvatarFallback = ({ children, className }: any) => (
  <span
    className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}
  >
    {children}
  </span>
);

const Badge = ({ children, className }: any) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}
  >
    {children}
  </div>
);

const ScrollArea = ({ children, className }: any) => (
  <div className={`relative h-full overflow-y-auto ${className}`}>
    {children}
  </div>
);

// --- [2. 데이터 타입 및 더미 데이터] ---
interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  type: "text";
}

interface HospitalChat {
  id: number;
  name: string;
  department: string; 
  status: "online" | "offline" | "busy";
  avatar: string; 
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

const hospitalList: HospitalChat[] = [
  {
    id: 1,
    name: "순천향대학교 부천병원",
    department: "외과",
    status: "online",
    avatar: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300",
    lastMessage: "네, 내일 오후 2시 예약 가능합니다.",
    lastTime: "오후 2:14",
    unreadCount: 1,
  },
  {
    id: 2,
    name: "부천세종병원",
    department: "내과",
    status: "busy",
    avatar: "https://images.unsplash.com/photo-1516574187841-693083f05212?w=300",
    lastMessage: "진료비 영수증 파일 보내드렸습니다.",
    lastTime: "오후 1:52",
    unreadCount: 1,
  },
  {
    id: 3,
    name: "부천성모병원",
    department: "정형외과",
    status: "offline",
    avatar: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300",
    lastMessage: "(광고) 겨울철 건강검진 할인 이벤트 안내",
    lastTime: "오후 1:07",
    unreadCount: 0,
  },
  {
    id: 4,
    name: "삼성서울병원",
    department: "이비인후과",
    status: "online",
    avatar: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300",
    lastMessage: "문의주신 내용 확인 중입니다.",
    lastTime: "오전 11:41",
    unreadCount: 0,
  },
];

// --- [3. 메인 컴포넌트] ---
export default function FaqPage() {
  const [selectedChatId, setSelectedChatId] = useState<number>(1);
  const activeChat = hospitalList.find((chat) => chat.id === selectedChatId) || hospitalList[0];

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "system-1",
        content: `안녕하세요! ${activeChat.name} ${activeChat.department}입니다. 무엇을 도와드릴까요?`,
        sender: "agent",
        timestamp: "현재",
        type: "text",
      },
    ]);
  }, [selectedChatId, activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsTyping(true);

      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "네, 말씀해주신 내용을 확인했습니다. 잠시만 기다려주세요.",
          sender: "agent",
          timestamp: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "text",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("선택된 파일:", file.name);
  };

  const getStatusColor = (status: string) => {
    if (status === "online") return "bg-green-500";
    if (status === "busy") return "bg-red-500";
    return "bg-gray-400";
  };

  const getStatusText = (status: string) => {
    if (status === "online") return "상담 가능";
    if (status === "busy") return "상담 중";
    return "오프라인";
  };

  return (
    <main className="bg-gray-100 h-screen pt-16 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl shadow-lg flex overflow-hidden border border-gray-200">
        
        {/* [좌측] 병원 목록 사이드바 */}
        <div className="w-1/3 min-w-[320px] border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-800">채팅</h1>
            <div className="flex gap-3 text-gray-600">
              <Search className="cursor-pointer hover:text-black" size={20} />
              <Plus className="cursor-pointer hover:text-black" size={20} />
              <Bell className="cursor-pointer hover:text-black" size={20} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {hospitalList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChatId === chat.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="relative mr-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-900 truncate text-[15px]">
                      {chat.name}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">
                      {chat.lastTime}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate w-[80%]">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* [우측] 채팅창 영역 */}
        <div className="flex-1 flex flex-col bg-[#F2F5F9] relative">
          <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusColor(
                    activeChat.status
                  )}`}
                ></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                  {activeChat.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">{activeChat.department}</p>
                  <Badge className={`text-[10px] px-1.5 py-0 bg-gray-100 text-gray-600 border-none`}>
                    {getStatusText(activeChat.status)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="bg-transparent text-gray-500 hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-transparent text-gray-500 hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {message.sender === "agent" && (
                      <Avatar className="w-8 h-8 hidden md:flex">
                        <AvatarImage
                          src={activeChat.avatar}
                          alt={activeChat.name}
                        />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 shadow-sm ${
                        message.sender === "user"
                          ? "bg-[#5CA0FF] text-white"
                          : "bg-white text-gray-900 border border-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span
                        className={`text-[10px] block text-right mt-1 ${
                          message.sender === "user"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activeChat.avatar} alt="typing" />
                    </Avatar>
                    <div className="bg-white rounded-lg px-3 py-2 border border-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <Button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-[#5CA0FF] transition-all">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400 text-sm"
                />
              </div>

              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                className={`rounded-full w-10 h-10 p-0 flex items-center justify-center ${!newMessage.trim() ? 'bg-gray-300 hover:bg-gray-300' : 'bg-[#5CA0FF]'}`}
              >
                <Send className="h-5 w-5 ml-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}