export interface Bot {
  id: number;
  name: string;
  botStatus: 'online' | 'offline';
  lastUpdate: string;
  createdAt: string;
}

export interface Guild {
  guildId: number;
  guildDiscordId: string;
  guildName: string;
  joinedAt: string;
}

export interface CommandHistory {
  guildId: number;
  guildName: string;
  userNickname: string;
  requestMessage: string | null;
  response: string;
  createdAt: string;
}

export interface Command {
  commandName: string;
  createdAt: string;
  history: CommandHistory[];
}