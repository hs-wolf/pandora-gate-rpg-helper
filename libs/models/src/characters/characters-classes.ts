import { Element } from '../elements';

export class Character {
  constructor(
    public id: string,
    public ownerId: string,
    public name: string,
    public guild: string,
    public elements: Element[]
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
    return new Character(
      map['id'] ?? null,
      map['ownerId'] ?? null,
      map['name'] ?? null,
      map['guild'] ?? null,
      map['elements'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      name: this.name,
      guild: this.guild,
      elements: this.elements,
    };
  }
}
