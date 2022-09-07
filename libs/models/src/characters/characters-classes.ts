import { Element } from '../elements';
import { Job } from '../jobs';
import {
  Attributes,
  FixedEffect,
  LinkedEffect,
  PercentageEffect,
  FixedOperators,
  PercentageOperators,
  BasicData,
  LinkedOperators,
  EffectFieldsList,
  BasicStats,
  Ranges,
  Accuracies,
  PhysicalBonus,
  MagicalBonus,
} from './characters-types';

export class Character {
  constructor(
    public id: string,
    public ownerId: string,
    public name: string,
    public guild: string,
    public elements: Element[],
    public jobs: Job[],
    public basicData: BasicData,
    public attributes: Attributes,
    public basicStats: BasicStats,
    public ranges: Ranges,
    public accuracies: Accuracies,
    public physicalBonus: PhysicalBonus,
    public magicalBonus: MagicalBonus,
    public fixedEffects: FixedEffect[],
    public linkedEffects: LinkedEffect[],
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
      map['basicData'] ?? null,
      map['attributes'] ?? null,
      map['basicStats'] ?? null,
      map['ranges'] ?? null,
      map['accuracies'] ?? null,
      map['physicalBonus'] ?? null,
      map['magicalBonus'] ?? null,
      map['fixedEffects'] ?? null,
      map['linkedEffects'] ?? null,
      map['percentageEffects'] ?? null
    );
  }

  getFieldFinalValue(field: EffectFieldsList) {
    let initial = 0;
    if (field in this.basicData) {
      initial = this.basicData[field as keyof BasicData];
    } else if (field in this.attributes) {
      initial = this.attributes[field as keyof Attributes];
    } else if (field in this.basicStats) {
      initial = this.basicStats[field as keyof BasicStats];
    } else if (field in this.ranges) {
      initial = this.ranges[field as keyof Ranges];
    } else if (field in this.accuracies) {
      initial = this.accuracies[field as keyof Accuracies];
    } else if (field in this.physicalBonus) {
      initial = this.physicalBonus[field as keyof PhysicalBonus];
    } else if (field in this.magicalBonus) {
      initial = this.magicalBonus[field as keyof MagicalBonus];
    } else {
      return;
    }
    const fixedEffects = this.fixedEffects.filter(
      (effect) => effect.target === field
    );
    const linkedEffects = this.linkedEffects.filter(
      (effect) => effect.target === field
    );
    const percentageEffects = this.percentageEffects.filter(
      (effect) => effect.target === field
    );
    const appliedSumsAndSubtractions = this.applySumsAndSubtractions(
      initial,
      fixedEffects,
      linkedEffects
    );
    const appliedMultiplications = this.applyMultiplications(
      appliedSumsAndSubtractions,
      fixedEffects,
      linkedEffects
    );
    const appliedPercentages = this.applyPercentages(
      appliedMultiplications,
      percentageEffects
    );
    const appliedDivisions = this.applyDivisions(
      appliedPercentages,
      fixedEffects,
      linkedEffects
    );
    return appliedDivisions;
  }

  applySumsAndSubtractions(
    initialValue: number,
    fixedEffects: FixedEffect[],
    linkedEffects: LinkedEffect[]
  ) {
    let finalValue = initialValue;
    fixedEffects.forEach((effect) => {
      if (effect.operator === FixedOperators.SUM) {
        finalValue += effect.value;
      }
      if (effect.operator === FixedOperators.SUBTRACTION) {
        finalValue -= effect.value;
      }
    });
    linkedEffects.forEach((effect) => {
      if (effect.targetOperator === FixedOperators.SUM) {
        let fieldValue = this.getFieldFinalValue(effect.field) ?? 0;
        switch (effect.fieldOperator) {
          case LinkedOperators.MULTIPLICATION:
            fieldValue *= effect.value;
            break;
          case LinkedOperators.DIVISION:
            fieldValue = Math.floor(fieldValue / effect.value);
            break;
        }
        finalValue += fieldValue;
      }
      if (effect.targetOperator === FixedOperators.SUBTRACTION) {
        let fieldValue = this.getFieldFinalValue(effect.field) ?? 0;
        switch (effect.fieldOperator) {
          case LinkedOperators.MULTIPLICATION:
            fieldValue *= effect.value;
            break;
          case LinkedOperators.DIVISION:
            fieldValue = Math.floor(fieldValue / effect.value);
            break;
        }
        finalValue -= fieldValue;
      }
    });
    return finalValue;
  }

  applyMultiplications(
    initialValue: number,
    fixedEffects: FixedEffect[],
    linkedEffects: LinkedEffect[]
  ) {
    let finalValue = initialValue;
    fixedEffects.forEach((effect) => {
      if (effect.operator === FixedOperators.MULTIPLICATION) {
        finalValue *= effect.value;
      }
    });
    linkedEffects.forEach((effect) => {
      if (effect.targetOperator === FixedOperators.MULTIPLICATION) {
        let fieldValue = this.getFieldFinalValue(effect.field) ?? 0;
        switch (effect.fieldOperator) {
          case LinkedOperators.MULTIPLICATION:
            fieldValue *= effect.value;
            break;
          case LinkedOperators.DIVISION:
            fieldValue = Math.floor(fieldValue / effect.value);
            break;
        }
        finalValue *= fieldValue;
      }
    });
    return finalValue;
  }

  applyPercentages(
    initialValue: number,
    percentageEffects: PercentageEffect[]
  ) {
    let finalValue = initialValue;
    let finalPercentage = 0;
    percentageEffects.forEach((effect) => {
      if (effect.operator === PercentageOperators.SUM) {
        finalPercentage += effect.value;
      }
      if (effect.operator === PercentageOperators.SUBTRACTION) {
        finalPercentage -= effect.value;
      }
    });
    if (finalPercentage < 0) {
      finalValue -= Math.floor(finalValue * (Math.abs(finalPercentage) / 100));
    }
    if (finalPercentage > 0) {
      finalValue += Math.floor(finalValue * (Math.abs(finalPercentage) / 100));
    }
    return finalValue;
  }

  applyDivisions(
    initialValue: number,
    fixedEffects: FixedEffect[],
    linkedEffects: LinkedEffect[]
  ) {
    let finalValue = initialValue;
    fixedEffects.forEach((effect) => {
      if (effect.operator === FixedOperators.DIVISION) {
        finalValue = Math.floor(finalValue / effect.value);
      }
    });
    linkedEffects.forEach((effect) => {
      if (effect.targetOperator === FixedOperators.MULTIPLICATION) {
        let fieldValue = this.getFieldFinalValue(effect.field) ?? 0;
        switch (effect.fieldOperator) {
          case LinkedOperators.MULTIPLICATION:
            fieldValue *= effect.value;
            break;
          case LinkedOperators.DIVISION:
            fieldValue = Math.floor(fieldValue / effect.value);
            break;
        }
        finalValue = Math.floor(finalValue / fieldValue);
      }
    });
    return finalValue;
  }

  getAttributeMod(attr: keyof Attributes) {
    const value = this.getFieldFinalValue(attr as EffectFieldsList);
    return Math.floor((value ?? 0) / 2);
  }

  toMap() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      name: this.name,
      guild: this.guild,
      elements: this.elements,
      jobs: this.jobs,
      basicData: this.basicData,
      attributes: this.attributes,
      basicStats: this.basicStats,
      ranges: this.ranges,
      accuracies: this.accuracies,
      physicalBonus: this.physicalBonus,
      magicalBonus: this.magicalBonus,
      fixedEffects: this.fixedEffects,
      linkedEffects: this.linkedEffects,
      percentageEffects: this.percentageEffects,
    };
  }
}
