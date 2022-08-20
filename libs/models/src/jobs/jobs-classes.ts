export class Job {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public tier: number,
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
    return new Job(
      map['id'] ?? null,
      map['name'] ?? null,
      map['description'] ?? null,
      map['tier'] ?? null,
      map['img'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      tier: this.tier,
      img: this.img,
    };
  }
}
