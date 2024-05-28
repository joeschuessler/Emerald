let emerald = client.emerald;
let skills = emerald.skills = {};

skills.has = (skill, ab = undefined) => {
  client.emerald.debugmsg(JSON.stringify(skills[skill]));
  if (ab) {
    return skills[skill] && skills[skill][ab];
  } else {
    return skills[skill];
  }
}