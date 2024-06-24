let emerald = client.emerald;
let affs = client.emerald.affs = {
  name: 'EmeraldAffs',
  version: '0.0.1'
};

affs.set = (aff,val) => {
  client.emerald.debugmsg(`Setting affs.${aff} to ${val}`);
  affs[aff].value = val;
  if (affs.has('mutilatedleftleg') && affs.has('mutilatedrightleg') || affs.has('asleep')) affs.set('sprawled',true);
  return val;
}

affs.has = (aff) => {
  client.emerald.debugmsg(`Affs.has(${aff}) = ${affs[aff].value}`)
  return affs[aff].value
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
  ].every(aff => {affs[aff].value == false || affs[aff].value == 0});
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
  ].every(aff => {affs[aff].value == false || affs[aff].value == 0});
}

affs.hasWounds = () => {
  return [
    'lightheadwounds','heavyheadwounds','criticalheadwounds',
    'lightchestwounds','heavychestwounds','criticalchestwounds',
    'lightgutwounds','heavygutwounds','criticalgutwounds',
    'lightleftarmwounds','heavyleftarmwounds','criticalleftarmwounds',
    'lightrightarmwounds','heavyrightarmwounds','criticalrightarmwounds',
    'lightleftlegwounds','heavyleftlegwounds','criticalleftlegwounds',
    'lightrightlegwounds','heavyrightlegwounds','criticalrightlegwounds'
  ].some(a=>affs.has(a));
}

affs.hasHeadWounds = () => {
  return ['lightheadwounds','heavyheadwounds','criticalheadwounds'].some(a=>affs.has(a)) || affs.has('damagedthroat') || affs.has('damageskull');
}
affs.hasChestWounds = () => {
  return ['lightchestwounds','heavychestwounds','criticalchestwounds'].some(a=>affs.has(a)) || affs.has('creshedchest') || affs.has('collapsedlung');
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
        ? clr = 'lime'
        : clr = 'silver';
  return clr;
}

affs.reset();
emerald.plugins['affs'] = true;
emerald.emnote(`${affs.name} v${affs.version} initialised.`);