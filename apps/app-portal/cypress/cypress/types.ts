import { User } from '../common/types';
/**
 * Represents the argument for the `createUserInBackend` task.
 *
 * When using the task, first declare the arg with this type, so that
 * if it gets changed later, all the usages of the task can be easily
 * found and updated.
 */
export type CreateUserInBackendArg = {
  email: string;
  token: string;
  isAdmin: boolean;
  user?: Partial<User>;
};
