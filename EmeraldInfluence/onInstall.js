let emerald = client.emerald;
let influence = emerald.influnce = {
  name: 'EmeraldInfluence',
  version:'0.0.1',
  attacks:{charity:[],paranoia:[],weakening:[],empowering:[],seduction:[],village:[]},
  target: null,
  mode: null,
  active: false,
  atkIndex: 0
};
let xlate = {
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
influence.attacks[charity] = emerald.skills['influence'].filter(s => xlate[s]='charity');
influence.attacks[paranoia] = emerald.skills['influence'].filter(s => xlate[s]='paranoia');
influence.attacks[weakening] = emerald.skills['influence'].filter(s => xlate[s]='weakening');
influence.attacks[empowering] = emerald.skills['influence'].filter(s => xlate[s]='empowering');
influence.attacks[seduction] = emerald.skills['influence'].filter(s => xlate[s]='seduction');
influence.attacks[village] = emerald.skills['influence'].filter(s => xlate[s]='village');

influence.try = () => {
  atkIndex = ++atkIndex % 3;
  send_command(`influence ${influence.target} with ${influence.attacks[influence.mode][atkIndex]}`);
}

influence.onPrompt = () => {
  if (influence.active && influence.mode && influence.target && emerald.bals.onbal) {
    influence.try();
  }
  return true;
}