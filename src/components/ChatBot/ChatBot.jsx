import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { assets } from '../../assets/assets';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your AI Food Assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! Hungry for something delicious?";
    }
    if (lowerInput.includes('pizza')) {
      return "We have amazing pizzas! Check out our menu for Margheritas, Pepperoni, and more.";
    }
    if (lowerInput.includes('burger')) {
      return "Our burgers are juicy and fresh! Try our classic cheeseburger.";
    }
    if (lowerInput.includes('salad') || lowerInput.includes('veg')) {
      return "Looking for something healthy? Our Greek Salad and Pure Veg dishes are top-notch.";
    }
    if (lowerInput.includes('delivery') || lowerInput.includes('time')) {
      return "We deliver within 30-45 minutes. Hot and fresh!";
    }
    if (lowerInput.includes('contact') || lowerInput.includes('support')) {
      return "You can reach us at contact@foodzone.com or +1-123-456-7890.";
    }
    if (lowerInput.includes('thank')) {
      return "You're welcome! Enjoy your meal!";
    }
    return "I'm not sure about that, but our menu has something for everyone! Try asking about pizzas, burgers, or delivery.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    
    const botReplyText = generateResponse(inputText);
    setInputText("");

    // Simulate delay for natural feel
    setTimeout(() => {
      const botMessage = { text: botReplyText, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>FoodZone AI</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me about food..."
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
