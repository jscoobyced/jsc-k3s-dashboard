export type User = {
  username: string;
  password: string;
};
export type Session = {
  sessionId: string;
  username: string;
};

export type Entity = User | Session;
