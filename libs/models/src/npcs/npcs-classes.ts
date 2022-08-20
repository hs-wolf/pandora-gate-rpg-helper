export class Npc {
  constructor(
    public id: string,
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
    return new Npc(
      map['id'] ?? null,
      map['name'] ?? null,
      map['description'] ?? null,
      map['img'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      img: this.img,
    };
  }
}
