export interface UserAuth {
  id: number;
//   [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth | null;
    }
  }
}
