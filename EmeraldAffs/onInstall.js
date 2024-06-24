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

affs.reset();
emerald.plugins['affs'] = true;
emerald.emnote(`${affs.name} v${affs.version} initialised.`);