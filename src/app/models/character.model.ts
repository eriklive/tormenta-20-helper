export interface Character {
    name: string;
    race: string;
    class: string;
    level: number;
    attributes: {
      strength: number;
      dexterity: number;
      constitution: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    };
    hp: {
      max: number;
      current: number;
    };
    mp: {
      max: number;
      current: number;
    };
    defense: number;
    manaDefense: number;
    skills: {
      [skillName: string]: number;
    };
    abilities: string[];
    equipment: string[];
  }
  