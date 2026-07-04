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

  type GenericDelegate = {
    findFirst(args?: unknown): Promise<unknown>;
    create(args: unknown): Promise<unknown>;
    createMany(args: unknown): Promise<unknown>;
    upsert(args: unknown): Promise<unknown>;
    update(args: unknown): Promise<unknown>;
    deleteMany(args: unknown): Promise<unknown>;
  };

  export class PrismaClient {
    constructor(options?: unknown);
    users: UserDelegate;
    courses: GenericDelegate;
    study_plans: GenericDelegate;
    study_plan_items: GenericDelegate;
  }
}
