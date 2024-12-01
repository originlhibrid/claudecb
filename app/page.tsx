"use client"

import { useState } from "react"
import { ChatInput } from "@/components/ui/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  content: string
  isUser: boolean
}

const CLAUDE_MODELS = [
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet (Latest)",
    context: "40,000 tokens",
    output: "8,000 tokens"
  },
  {
    id: "claude-3-5-sonnet-20240620",
    name: "Claude 3.5 Sonnet",
    context: "40,000 tokens",
    output: "8,000 tokens"
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    context: "50,000 tokens",
    output: "10,000 tokens"
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    context: "20,000 tokens",
    output: "4,000 tokens"
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    context: "40,000 tokens",
    output: "8,000 tokens"
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    context: "50,000 tokens",
    output: "10,000 tokens"
  }
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_MODEL || "claude-3-5-sonnet-20241022"
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (message: string) => {
    try {
      setIsLoading(true)
      setMessages(prev => [...prev, { content: message, isUser: true }])

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

  const selectedModel = CLAUDE_MODELS.find(m => m.id === model)

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 flex gap-4">
          <Input
            type="password"
            placeholder="Enter your Anthropic API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select model">
                {selectedModel?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {CLAUDE_MODELS.map((model) => (
                <SelectItem 
                  key={model.id} 
                  value={model.id}
                  className="flex flex-col items-start py-2"
                >
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Context: {model.context} • Output: {model.output}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-y-auto border rounded-lg mb-4 bg-background dark:bg-zinc-900">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.isUser}
            model={selectedModel?.name || model}
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
