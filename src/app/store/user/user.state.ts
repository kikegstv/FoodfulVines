
import { User } from '../../features/auth/models/user.model';

export interface UserState {
  userData: User | null;
}
