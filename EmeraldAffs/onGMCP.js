let affs = client.emerald.affs;
if (args.gmcp_method == "Char.Vitals") {
  let v = args.gmcp_args
  if (v.hp=='0'&&v.mp=='0'&&v.ego=='0'&&v.pow=='0'&&!affs.has('blackout')) affs.set('blackout',true);
  if (to_number(v.headwounds) > 0) {
    affs.set('lightheadwounds',true);
  } else {
    affs.clear('lightheadwounds');
    affs.clear('heavyheadwounds');
    affs.clear('criticalheadwounds');
  }
  if (to_number(v.headwounds) >= 35) {
    affs.set('lightheadwounds',true);
    affs.set('heavyheadwounds',true);
  } else {
    affs.clear('heavyheadwounds');
    affs.clear('criticalheadwounds');
  }
  if (to_number(v.headwounds) >= 75) {
    affs.set('lightheadwounds',true);
    affs.set('heavyheadwounds',true);
    affs.set('criticalheadwounds',true);
  } else {
    affs.clear('criticalheadwounds');
  }
  if (to_number(v.chestwounds) > 0) {
    affs.set('lightchestwounds',true);
  } else {
    affs.clear('lightchestwounds');
    affs.clear('heavychestwounds');
    affs.clear('criticalchestwounds');
  }
  if (to_number(v.chestwounds) >= 35) {
    affs.set('lightchestwounds',true);
    affs.set('heavychestwounds',true);
  } else {
    affs.clear('heavychestwounds');
    affs.clear('criticalchestwounds');
  }
  if (to_number(v.chestwounds) >= 75) {
    affs.set('lightchestwounds',true);
    affs.set('heavychestwounds',true);
    affs.set('criticalchestwounds',true);
  } else {
    affs.clear('criticalchestwounds');
  }
  if (to_number(v.gutwounds) > 0) {
    affs.set('lightgutwounds',true);
  } else {
    affs.clear('lightgutwounds');
    affs.clear('heavygutwounds');
    affs.clear('criticalgutwounds');
  }
  if (to_number(v.gutwounds) >= 35) {
    affs.set('lightgutwounds',true);
    affs.set('heavygutwounds',true);
  } else {
    affs.clear('heavygutwounds');
    affs.clear('criticalgutwounds');
  }
  if (to_number(v.gutwounds) >= 75) {
    affs.set('lightgutwounds',true);
    affs.set('heavygutwounds',true);
    affs.set('criticalgutwounds',true);
  } else {
    affs.clear('criticalgutwounds');
  }
  if (to_number(v.leftarmwounds) > 0) {
    affs.set('lightleftarmwounds',true);
  } else {
    affs.clear('lightleftarmwounds');
    affs.clear('heavyleftarmwounds');
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(v.leftarmwounds) >= 35) {
    affs.set('lightleftarmwounds',true);
    affs.set('heavyleftarmwounds',true);
  } else {
    affs.clear('heavyleftarmwounds');
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(v.leftarmwounds) >= 75) {
    affs.set('lightleftarmwounds',true);
    affs.set('heavyleftarmwounds',true);
    affs.set('criticalleftarmwounds',true);
  } else {
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(v.rightarmwounds) > 0) {
    affs.set('lightrightarmwounds',true);
  } else {
    affs.clear('lightrightarmwounds');
    affs.clear('heavyrightarmwounds');
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(v.rightarmwounds) >= 35) {
    affs.set('lightrightarmwounds',true);
    affs.set('heavyrightarmwounds',true);
  } else {
    affs.clear('heavyrightarmwounds');
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(v.rightarmwounds) >= 75) {
    affs.set('lightrightarmwounds',true);
    affs.set('heavyrightarmwounds',true);
    affs.set('criticalrightarmwounds',true);
  } else {
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(v.leftlegwounds) > 0) {
    affs.set('lightleftlegwounds',true);
  } else {
    affs.clear('lightleftlegwounds');
    affs.clear('heavyleftlegwounds');
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(v.leftlegwounds) >= 35) {
    affs.set('lightleftlegwounds',true);
    affs.set('heavyleftlegwounds',true);
  } else {
    affs.clear('heavyleftlegwounds');
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(v.leftlegwounds) >= 75) {
    affs.set('lightleftlegwounds',true);
    affs.set('heavyleftlegwounds',true);
    affs.set('criticalleftlegwounds',true);
  } else {
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(v.rightlegwounds) > 0) {
    affs.set('lightrightlegwounds',true);
  } else {
    affs.clear('lightrightlegwounds');
    affs.clear('heavyrightlegwounds');
    affs.clear('criticalrightlegwounds');
  }
  if (to_number(v.rightlegwounds) >= 35) {
    affs.set('lightrightlegwounds',true);
    affs.set('heavyrightlegwounds',true);
  } else {
    affs.clear('heavyrightlegwounds');
    affs.clear('criticalrightlegwounds');
  }
  if (to_number(v.rightlegwounds) >= 75) {
    affs.set('lightrightlegwounds',true);
    affs.set('heavyrightlegwounds',true);
    affs.set('criticalrightlegwounds',true);
  } else {
    affs.clear('criticalrightlegwounds');
  }
}