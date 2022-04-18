export interface User {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  last_login?: Date;
  created?: Date | string;
  updated?: Date | string;
  is_active?: boolean;
  groups?: [];
  user_permissions?: string[];
}

export interface UserWithPassword extends User {
  password: string;
}
