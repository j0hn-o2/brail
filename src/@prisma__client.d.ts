declare module "@prisma/client" {
  type UserRecord = {
    id: string;
    google_id?: string | null;
    email: string;
    full_name: string;
    profile_image?: string | null;
    password_hash?: string | null;
  };

  type UserDelegate = {
    findUnique(args: unknown): Promise<UserRecord | null>;
    create(args: unknown): Promise<UserRecord>;
    update(args: unknown): Promise<UserRecord>;
  };

  export class PrismaClient {
    constructor(options?: unknown);
    users: UserDelegate;
  }
}
