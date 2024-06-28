let emerald = client.emerald;
let skills = emerald.skills = {};

skills.has = (skill, ab = undefined) => {
  if (ab) {
    return skills[skill] && skills[skill][ab];
  } else {
    return skills[skill];
  }
}