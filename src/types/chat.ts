export interface Message {
  messageId: string;
  parentMessageId: string;
  children?: Message[];
  isCreatedByUser: boolean;
  text: string;
  createdAt: string;
  updatedAt: string;
  model?: string;
}

export interface LegacyChat {
  title: string;
  messages: Message[];
  options: {
    model: string;
    temperature: number;
    maxContextTokens: number;
    max_tokens: number;
  };
  conversationId: string;
}

export interface ConvertedMessage {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  models?: string[];
  model?: string;
}

export interface ConvertedChat {
  id: string;
  user_id: string;
  title: string;
  chat: {
    id: string;
    title: string;
    models: string[];
    params: {
      temperature: number;
      maxContextTokens: number;
      max_tokens: number;
    };
    history: {
      messages: Record<string, ConvertedMessage>;
      currentId: string | null;
    };
    messages: ConvertedMessage[];
  };
  updated_at: number;
  created_at: number;
  share_id: null;
  archived: boolean;
  pinned: boolean;
  meta: {
    tags: string[];
  };
  folder_id: null;
}