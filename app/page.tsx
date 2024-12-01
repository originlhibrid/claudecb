"use client"

import { useState } from "react"
import { ChatInput } from "@/components/ui/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  content: string
  isUser: boolean
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("claude-3-sonnet-20240229")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (message: string) => {
    try {
      setIsLoading(true)
      // Add user message
      setMessages(prev => [...prev, { content: message, isUser: true }])

      // Call our API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          apiKey,
          model,
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from Claude')
      }
      
      if (data.content && data.content[0] && data.content[0].text) {
        setMessages(prev => [...prev, { content: data.content[0].text, isUser: false }])
      } else {
        throw new Error('Unexpected response format from Claude')
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { 
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process your request'}`, 
        isUser: false 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <Input
          type="password"
          placeholder="Enter your Anthropic API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="flex-1"
        />
        <Select value={model} onValueChange={setModel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
            <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
            <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg mb-4 bg-background">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.isUser}
            model={model}
          />
        ))}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Start a conversation with Claude
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} disabled={!apiKey || isLoading} />
    </div>
  )
}
