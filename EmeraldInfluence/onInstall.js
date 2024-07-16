let emerald = client.emerald;
let influence = emerald.influence = {
  name: 'EmeraldInfluence',
  version:'0.0.1',
  attacks:{'charity':[],'paranoia':[],'weakening':[],'empowering':[],'seduction':[],'village':[]},
  target: null,
  mode: 'charity',
  active: false,
  atkIndex: 0
};
influence.xlate = {
  'begging':'charity','supplication':'charity','wheedling':'charity',
  'rumours':'paranoia','distrust':'paranoia','conspiracies':'paranoia',
  'teasing':'weakening','mockery':'weakening','derision':'weakening',
  'compliments':'empowering','admiration':'empowering','praise':'empowering',
  'flattery':'seduction','charm':'seduction','beguiling':'seduction',  
  'accordance':'village','collaboration':'village','assimilation':'village',
  'manipulation':'village','intrigue':'village','trickery':'village',
  'proselytising':'village','preaching':'village','evangelising':'village',
  'lectures':'village','recitation':'village','oration':'village',
  'liberty':'village','freedom':'village','revolution':'village',
  'shock':'village','awe':'village','brainwash':'village'
}

if (get_variable('emerald_skills_influence')) {
  let infskills = get_variable('emerald_skills_influence').split('|');
  let xlate = influence.xlate
  infskills.forEach(s => {
    let skl = s.toLowerCase()
    if (xlate.hasOwnProperty(skl)) influence.attacks[xlate[skl]].push(skl);
  })
}

influence.try = () => {
  emerald.debugmsg(`Trying influence. Mode:${influence.mode}. Target:${influence.target} Attack count: ${influence.attacks[influence.mode].length}`)
  influence.atkIndex = ++influence.atkIndex % 3;
  send_command(`influence ${influence.target} with ${influence.attacks[influence.mode][influence.atkIndex]}`);
}

influence.onPrompt = () => {
  if (influence.active && influence.mode && influence.target && emerald.bals.onbal) {
    influence.try();
  }
  return true;
}

emerald.plugins['influence'] = influence;
emerald.emnote(`${influence.name} v${influence.version} initialised.`);