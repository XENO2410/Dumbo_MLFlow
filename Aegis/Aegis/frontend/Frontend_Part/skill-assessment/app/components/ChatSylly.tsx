"use client";
import { useState, useEffect, useRef } from "react";
import { Message } from "../types/index";
import { marked } from "marked";
import { Mic, MicOff } from "lucide-react";

export function ChatSylly() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greetingMessage: Message = {
        role: "assistant",
        content: "Hi! I'm Dumbo, What would you like to know?",
      };
      setMessages((prev) => [...prev, greetingMessage]);
    }
  }, [messages.length]);

// frontend/Frontend_Part/skill-assessment/app/components/ChatSylly.tsx

const handleSendMessage = async () => {
    if (!userInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setError(null);
    const newUserMessage: Message = { role: "user", content: userInput };

    // FIX: Create the complete, updated list of messages first.
    const updatedMessages = [...messages, newUserMessage];

    // Use this new list to update the state.
    setMessages(updatedMessages);
    
    // And use the SAME new list to send to the API.
    // This ensures your newest message is included.
    const messageHistory = updatedMessages.map(({ role, content }) => ({
        role,
        content
    }));

    setUserInput("");

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // FIX: Use your actual Agent ID here.
          agentId: "656b61b1-bfbe-46a0-801d-8e66e0a5c353", // <-- PASTE YOUR REAL AGENT ID
          messages: messageHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response from backend");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: any) {
      setError(err.message || "Sorry, I encountered an error. Please try again.");
      console.error("Chat error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const startVoiceRecognition = () => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage();
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        alert(`Speech recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 p-4 text-white">
        <h1 className="text-xl font-bold">Dumbo Chatbot</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black shadow"
              }`}
            >
              <div
                className="whitespace-pre-wrap font-sans"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 text-center text-red-500 bg-red-100">{error}</div>
      )}

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
<input
  type="text"
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
  placeholder={isProcessing ? "Processing..." : "Type your question..."}
  disabled={isProcessing}
  className="flex-1 p-2 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
/>

          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !userInput.trim()}
            className={`px-4 py-2 rounded-lg bg-gray-900 text-white ${
              isProcessing || !userInput.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
          >
            Send
          </button>
          {/* Voice Input Button */}
          <button
            onClick={startVoiceRecognition}
            className={`p-3 rounded-full ${
              isListening ? "bg-red-500" : "bg-gray-700"
            } text-white hover:opacity-90 transition-opacity shadow-md`}
            title={isListening ? "Listening..." : "Start voice input"}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
