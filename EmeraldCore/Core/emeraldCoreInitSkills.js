let emerald = client.emerald;
let skills = emerald.skills = {};

skills.has = (skill, ab = undefined) => {
  if (ab) {
    return skills[skill] && skills[skill][ab];
  } else {
    return skills[skill];
  }
}

let allVars = Object.keys(client.variables().vars);
for (let v in allVars) {
  if (allVars[v].includes('emerald_skills_')) {
    let s = allVars[v].replace('emerald_skills_','');
    skills[s] = v.split('|');
  }
}