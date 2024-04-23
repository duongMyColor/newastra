type Role = 'ADMIN' | 'USER' | 'VIEW';

export interface UserIF {
  id?: number;
  username: string;
  name: string;
  role: Role;
  enabled: boolean;
  email: string;
  password: string;
  newPassword?: string;
  country: string;
  address: string;
  isDeleted?: boolean;
  created?: Date;
  updated?: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface RoleSelectInput {
  id: string | number;
  name: string;
}
