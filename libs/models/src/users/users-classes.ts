import { UserRoles } from './users-enums';

export class User {
  constructor(
    public id: string,
    public role: UserRoles,
    public name: string,
    public picture: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromFirestore(snapshot: any) {
    if (!snapshot || !snapshot.exists) {
      return null;
    }
    return this.fromMap({ ...snapshot.data(), id: snapshot.id });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromMap(map: any) {
    if (!map) {
      return null;
    }
    return new User(
      <string>map['id'] ?? null,
      <UserRoles>map['role'] ?? null,
      <string>map['name'] ?? null,
      <string>map['picture'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      role: this.role,
      name: this.name,
      picture: this.picture,
    };
  }
}
