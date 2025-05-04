import abstractNouns from "./abstractNouns.json";
import adjectives from "./adjective.json";
import adjectiveContrast from "./adjectiveContrast.json";
import adverbs from "./adverbs.json";
import animals from "./animals.json";
import body from "./body.json";
import business from "./business.json";
import counting from "./counting.json";
import commonNouns from "./commonNouns.json";
import essentialVerbs from "./essentialVerbs.json";
import foods from "./foods.json";
import helperVerbs from "./helperVerbs.json";
import houseObjects from "./houseObjects.json";
import lyWords from "./lyWords.json";
import actionsMental from "./actionsMental.json";
import actionsAbstract from "./actionsAbstract.json";
import actionsPhysical from "./actionsPhysical.json";
import expressions from "./expressions.json";
import actionsSenses from "./actionsSenses.json";
import measurements from "./measurements.json";
import nature from "./nature.json";
import newOnes from "./new.json";
import peoplesDescriptions from "./peoplesDescriptions.json";
import peoplesOccupations from "./peoplesOccupations.json";
import prepositions from "./prepositions.json";
import prepositionSentences from "./prepositionSentences.json";
import pronouns from "./pronouns.json";
import shapesAndColors from "./shapesAndColors.json";
import time from "./time.json";
import travel from "./travel.json";
import reflexiveVerbs from "./reflexiveVerbs.json";

const nthNumber = 2
const newOnesWithProps = {
  ...newOnes,
  Words: newOnes.Words.map((word) => ({ ...word, learned: false, done: false })).filter(
    // (word, index) => (index + 1) % 24 === nthNumber
    // (word, index) => (index + 1) % 3 === nthNumber && index > newOnes.Words.length - 100
    (word, index) => (index + 1) % 3 === nthNumber && index > 799 && index < 899
    // (word, index) => index > newOnes.Words.length - 30
)};

const allCategories = [
  actionsMental,
  actionsAbstract,
  actionsPhysical,
  actionsSenses,
  adjectives,
  adjectiveContrast,
  abstractNouns,
  adverbs,
  animals,
  body,
  business,
  counting,
  commonNouns,
  foods,
  essentialVerbs,
  expressions,
  helperVerbs,
  houseObjects,
  lyWords,
  measurements,
  nature,
  newOnesWithProps,
  peoplesDescriptions,
  peoplesOccupations,
  prepositions,
  prepositionSentences,
  pronouns,
  shapesAndColors,
  time,
  travel,
  reflexiveVerbs
];

export default allCategories;
