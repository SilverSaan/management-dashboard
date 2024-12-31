export interface Bot {
    id: number;
    name: string;
    botStatus: 'online' | 'offline';
    lastUpdate: string;
    createdAt: string;
}