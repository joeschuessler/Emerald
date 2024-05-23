let emerald = client.emerald;
let skills = emerald.skills = {};

skills.has = (skill, ab = undefined) => {
  client.emerald.debugmsg(JSON.stringify(emerald.skills[skill]));
  if (ab) {
    return emerald.skills[skill] && emerald.skills[skill][ab];
  } else {
    return emerald.skills[skill];
  }
}