let emerald = client.emerald;
let affs = client.emerald.affs = {
  name: 'EmeraldAffs',
  version: '0.1.0'
};
set_variable('emerald_affs_version',affs.version);

affs.set = (aff,val) => {
  try {
    client.emerald.debugmsg(`Setting affs.${aff} to ${val}`);
    affs[aff].value = val;
    if (affs.has('mutilatedleftleg') && affs.has('mutilatedrightleg') || affs.has('asleep')) affs['sprawled']=true;
    return val;
  } catch (error) {
    client.emerald.emnote(`Invalid aff set: ${error}`,'Affs');
  }
}

affs.has = (aff) => {
  return affs[aff].value;
}

affs.clear = (aff) => {
  return affs[aff].value = false;
}

affs.reset = () => {
  run_function('resetAffs','','EmeraldAffs');
  client.emerald.emnote('Affs cleared','Affs');
}

affs.canAct = () => {
  return [
    'aeon',
    'asleep',
    'damagedleftarm',
    'damagedrightarm',
    'crucified',
    'entangled',
    'frozen',
    'mutilatedleftarm',
    'mutilatedrightarm',
    'paralysis',
    'sprawled',
    'stun',
  ].every(aff => !affs[aff].value);
}

affs.canMove = () => {
  return [
    'mutilatedleftleg',
    'mutilatedrightleg',
    'entangled',
    'crucified',
    'frozen',
    'paralysis',
    'sprawled',
    'stun'
  ].every(aff => !affs[aff].value);
}

affs.hasWounds = () => {
  return [
    'lightheadwounds','heavyheadwounds','criticalheadwounds','damagedthroat','damagedskull',
    'lightchestwounds','heavychestwounds','criticalchestwounds','crushedchest','collapsedlung',
    'lightgutwounds','heavygutwounds','criticalgutwounds','damagedorgans','internalbleeding',
    'lightleftarmwounds','heavyleftarmwounds','criticalleftarmwounds','damagedleftarm','mutilatedleftarm',
    'lightrightarmwounds','heavyrightarmwounds','criticalrightarmwounds','damagedrightarm','mutilatedrightarm',
    'lightleftlegwounds','heavyleftlegwounds','criticalleftlegwounds','damagedleftleg','mutilatedleftleg',
    'lightrightlegwounds','heavyrightlegwounds','criticalrightlegwounds','damagedrightleg','mutilatedrightleg'
  ].some(a=>affs.has(a));
}

affs.hasHeadWounds = () => {
  return ['lightheadwounds','heavyheadwounds','criticalheadwounds'].some(a=>affs.has(a)) || affs.has('damagedthroat') || affs.has('damagedskull');
}
affs.hasChestWounds = () => {
  return ['lightchestwounds','heavychestwounds','criticalchestwounds'].some(a=>affs.has(a)) || affs.has('crushedchest') || affs.has('collapsedlung');
}
affs.hasGutWounds = () => {
  return ['lightgutwounds','heavygutwounds','criticalgutwounds'].some(a=>affs.has(a)) || affs.has('damagedorgans') || affs.has('internalbleeding');
}
affs.hasLeftArmWounds = () => {
  return ['lightleftarmwounds','heavyleftarmwounds','criticalleftarmwounds'].some(a=>affs.has(a)) || affs.has('damagedleftarm') || affs.has('mutilatedleftarm');
}
affs.hasRightArmWounds = () => {
  return ['lightrightarmwounds','heavyrightarmwounds','criticalrightarmwounds'].some(a=>affs.has(a)) || affs.has('damagedrightarm') || affs.has('mutilatedrightarm');
}
affs.hasLeftLegWounds = () => {
  return ['lightleftlegwounds','heavyleftlegwounds','criticalleftlegwounds'].some(a=>affs.has(a)) || affs.has('damagedleftleg') || affs.has('mutilatedleftleg');
}
affs.hasRightLegWounds = () => {
  return ['lightrightlegwounds','heavyrightlegwounds','criticalrightlegwounds'].some(a=>affs.has(a)) || affs.has('damagedrightleg') || affs.has('mutilatedrightleg');
}
affs.checkWoundLevel = (part) => {
  let clr = 'silver';
  affs.has(`critical${part}wounds`)
    ? clr = 'red'
    : affs.has(`heavy${part}wounds`)
      ? clr = 'yellow'
      : affs.has(`light${part}wounds`)
        ? clr = 'green'
        : clr = 'silver';
  return clr;
}

affs.hasDeathMark = () => {
  return affs.has('deathmark');
}

affs.onPrompt = () => {
  return true;
}

affs.reset();
emerald.plugins['affs'] = affs;
emerald.emnote(`${affs.name} v${affs.version} initialised.`);