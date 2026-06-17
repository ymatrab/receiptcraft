export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  sender_role: "user" | "admin";
  body: string;
  created_at: string;
}
