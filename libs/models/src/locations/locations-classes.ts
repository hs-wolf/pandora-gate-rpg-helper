import { LocationTypes } from './locations-enums';

export class Location {
  constructor(
    public id: string,
    public type: LocationTypes,
    public name: string,
    public description: string,
    public img: string
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
    return new Location(
      map['id'] ?? null,
      map['type'] ?? null,
      map['name'] ?? null,
      map['description'] ?? null,
      map['img'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      description: this.description,
      img: this.img,
    };
  }
}
