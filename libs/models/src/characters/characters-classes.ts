import { Element } from '../elements';
import { Job } from '../jobs';
import {
  Exp,
  Hunger,
  Attributes,
  FixedEffect,
  PercentageEffect,
  FixedOperators,
  PercentageOperators,
} from './characters-types';

export class Character {
  constructor(
    public id: string,
    public ownerId: string,
    public name: string,
    public guild: string,
    public elements: Element[],
    public jobs: Job[],
    public level: number,
    public exp: Exp,
    public jp: number,
    public enhancements: number,
    public skillRegen: number,
    public hunger: Hunger,
    public gold: number,
    public attributes: Attributes,
    public fixedEffects: FixedEffect[],
    public percentageEffects: PercentageEffect[]
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
      map['elements'] ?? null,
      map['jobs'] ?? null,
      map['level'] ?? null,
      map['exp'] ?? null,
      map['jp'] ?? null,
      map['enhancements'] ?? null,
      map['skillRegen'] ?? null,
      map['hunger'] ?? null,
      map['gold'] ?? null,
      map['attributes'] ?? null,
      map['fixedEffects'] ?? null,
      map['percentageEffects'] ?? null
    );
  }

  getFinalAttributes() {
    const keys = Object.keys(this.attributes);
    const final = this.attributes;
    keys.forEach((attribute) => {
      this.fixedEffects.forEach((effect) => {
        if (effect.field === attribute) {
          if (effect.operator === FixedOperators.SUM) {
            final[attribute as keyof Attributes] += effect.value;
          }
          if (effect.operator === FixedOperators.SUBTRACTION) {
            final[attribute as keyof Attributes] -= effect.value;
          }
        }
      });
      this.fixedEffects.forEach((effect) => {
        if (effect.field === attribute) {
          if (effect.operator === FixedOperators.MULTIPLICATION) {
            final[attribute as keyof Attributes] *= effect.value;
          }
        }
      });
      let finalPercentage = 0;
      this.percentageEffects.forEach((effect) => {
        if (effect.field === attribute) {
          if (effect.operator === PercentageOperators.SUM) {
            finalPercentage += effect.value;
          }
          if (effect.operator === PercentageOperators.SUBTRACTION) {
            finalPercentage -= effect.value;
          }
        }
      });
      if (finalPercentage < 0) {
        final[attribute as keyof Attributes] -= Math.floor(
          final[attribute as keyof Attributes] *
            (Math.abs(finalPercentage) / 100)
        );
      }
      if (finalPercentage > 0) {
        final[attribute as keyof Attributes] += Math.floor(
          final[attribute as keyof Attributes] *
            (Math.abs(finalPercentage) / 100)
        );
      }
      this.fixedEffects.forEach((effect) => {
        if (effect.field === attribute) {
          if (effect.operator === FixedOperators.DIVISION) {
            final[attribute as keyof Attributes] /= effect.value;
          }
        }
      });
    });
    return final;
  }

  getAttributesMods() {
    return {
      strength: this.attributes.strength / 2,
      agility: this.attributes.agility / 2,
      dexterity: this.attributes.dexterity / 2,
      vitality: this.attributes.vitality / 2,
      spirit: this.attributes.spirit / 2,
      luck: this.attributes.luck / 2,
    };
  }

  toMap() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      name: this.name,
      guild: this.guild,
      elements: this.elements,
      jobs: this.jobs,
      level: this.level,
      exp: this.exp,
      jp: this.jp,
      enhancements: this.enhancements,
      skillRegen: this.skillRegen,
      hunger: this.hunger,
      gold: this.gold,
      attributes: this.attributes,
      fixedEffects: this.fixedEffects,
      percentageEffects: this.percentageEffects,
    };
  }
}
