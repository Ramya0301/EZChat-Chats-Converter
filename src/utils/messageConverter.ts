import { Message, ConvertedMessage } from '../types/chat';
import { convertTimestamp } from './dateUtils';

/**
 * Convert a single message from old format to new format
 */
export function convertMessageFormat(message: Message): ConvertedMessage {
  const baseMessage = {
    id: message.messageId,
    parentId: message.parentMessageId !== "00000000-0000-0000-0000-000000000000" 
      ? message.parentMessageId 
      : null,
    childrenIds: message.children?.map(child => child.messageId) || [],
    role: message.isCreatedByUser ? "user" : "assistant",
    content: message.text,
    timestamp: convertTimestamp(message.createdAt),
  };

  // Add model information based on user/assistant role
  if (message.isCreatedByUser) {
    return {
      ...baseMessage,
      models: ["gpt-4o-mini"]
    };
  } else {
    return {
      ...baseMessage,
      model: message.model
    };
  }
}