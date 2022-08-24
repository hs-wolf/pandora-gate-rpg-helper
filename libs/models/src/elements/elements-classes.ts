export class Element {
  constructor(
    public id: string,
    public name: string,
    public double: string,
    public triple: string,
    public description: string,
    public image: string
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
    return new Element(
      map['id'] ?? null,
      map['name'] ?? null,
      map['double'] ?? null,
      map['triple'] ?? null,
      map['description'] ?? null,
      map['image'] ?? null
    );
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      double: this.double,
      triple: this.triple,
      description: this.description,
      image: this.image,
    };
  }
}
