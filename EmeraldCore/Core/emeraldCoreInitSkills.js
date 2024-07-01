let emerald = client.emerald;
let skills = emerald.skills ||= {};

skills.has = (skill, ab = undefined) => {
  return ab ? skills[skill] && skills[skill][ab] : skills[skill];
}