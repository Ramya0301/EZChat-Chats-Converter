import { LegacyChat, ConvertedChat, Message, ConvertedMessage } from '../types/chat';
import { convertMessageFormat } from './messageConverter';
import { convertTimestamp } from './dateUtils';

/**
 * Convert the legacy chat format to the new format
 */
export function convertLegacyChatFormat(inputData: LegacyChat): ConvertedChat[] {
  const messagesDict: Record<string, ConvertedMessage> = {};
  const flatMessages: ConvertedMessage[] = [];
  
  function processMessageTree(message: Message) {
    const msgConverted = convertMessageFormat(message);
    messagesDict[message.messageId] = msgConverted;
    flatMessages.push(msgConverted);
    
    message.children?.forEach(child => {
      processMessageTree(child);
    });
  }
  
  // Process the message tree starting from the root message
  processMessageTree(inputData.messages[0]);

  // Find earliest and latest timestamps
  const timestamps = inputData.messages.map(msg => ({
    created: convertTimestamp(msg.createdAt),
    updated: convertTimestamp(msg.updatedAt)
  }));

  const created_at = Math.min(...timestamps.map(t => t.created));
  const updated_at = Math.max(...timestamps.map(t => t.updated));
  
  return [{
    id: inputData.conversationId,
    user_id: "user-id-placeholder",
    title: inputData.title,
    chat: {
      id: "",
      title: inputData.title,
      models: [inputData.options.model],
      params: {
        temperature: inputData.options.temperature,
        maxContextTokens: inputData.options.maxContextTokens,
        max_tokens: inputData.options.max_tokens
      },
      history: {
        messages: messagesDict,
        currentId: flatMessages[flatMessages.length - 1].id
      },
      messages: flatMessages
    },
    updated_at,
    created_at,
    share_id: null,
    archived: false,
    pinned: false,
    meta: {
      tags: ["general"]
    },
    folder_id: null
  }];
}