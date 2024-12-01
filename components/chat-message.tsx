import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: string
  isUser: boolean
  model?: string
}

export function ChatMessage({ message, isUser, model = "claude-3" }: ChatMessageProps) {
  return (
    <div 
      className={cn(
        "flex gap-4 p-4 transition-colors",
        isUser ? "bg-muted/50" : "bg-background hover:bg-muted/30"
      )}
    >
      <Avatar className={cn("w-8 h-8", isUser ? "bg-primary" : "bg-purple-500")}>
        <AvatarFallback className="text-background text-sm">
          {isUser ? "Y" : "C"}
        </AvatarFallback>
        {!isUser && (
          <AvatarImage src="/claude-avatar.png" alt="Claude" />
        )}
      </Avatar>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm font-medium">
          {isUser ? "You" : model}
        </p>
        <div className="text-sm text-foreground whitespace-pre-wrap">
          {message}
        </div>
      </div>
    </div>
  )
}
