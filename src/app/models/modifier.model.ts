export interface AttributeModifiers {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  [key: string]: number; // <- ESSA LINHA resolve o erro
}

export interface RaceModifiers {
  [race: string]: AttributeModifiers;
}

export interface ClassModifiers {
  [className: string]: AttributeModifiers;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
