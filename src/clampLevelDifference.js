export default function clampLevelDifference(partyLevel, creatureLevel) {
  return Math.min(Math.max(creatureLevel - partyLevel, -4), 4);
}
