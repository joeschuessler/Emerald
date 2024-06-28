let affs = client.emerald.affs;
if (args.gmcp_method == "Char.Vitals") {
  if (to_number(args.gmcp_args.headwounds) > 0) {
    affs.set('lightheadwounds',true);
  } else {
    affs.clear('lightheadwounds');
    affs.clear('heavyheadwounds');
    affs.clear('criticalheadwounds');
  }
  if (to_number(args.gmcp_args.headwounds) >= 35) {
    affs.set('lightheadwounds',true);
    affs.set('heavyheadwounds',true);
  } else {
    affs.clear('heavyheadwounds');
    affs.clear('criticalheadwounds');
  }
  if (to_number(args.gmcp_args.headwounds) >= 75) {
    affs.set('lightheadwounds',true);
    affs.set('heavyheadwounds',true);
    affs.set('criticalheadwounds',true);
  } else {
    affs.clear('criticalheadwounds');
  }
  if (to_number(args.gmcp_args.chestwounds) > 0) {
    affs.set('lightchestwounds',true);
  } else {
    affs.clear('lightchestwounds');
    affs.clear('heavychestwounds');
    affs.clear('criticalchestwounds');
  }
  if (to_number(args.gmcp_args.chestwounds) >= 35) {
    affs.set('lightchestwounds',true);
    affs.set('heavychestwounds',true);
  } else {
    affs.clear('heavychestwounds');
    affs.clear('criticalchestwounds');
  }
  if (to_number(args.gmcp_args.chestwounds) >= 75) {
    affs.set('lightchestwounds',true);
    affs.set('heavychestwounds',true);
    affs.set('criticalchestwounds',true);
  } else {
    affs.clear('criticalchestwounds');
  }
  if (to_number(args.gmcp_args.gutwounds) > 0) {
    affs.set('lightgutwounds',true);
  } else {
    affs.clear('lightgutwounds');
    affs.clear('heavygutwounds');
    affs.clear('criticalgutwounds');
  }
  if (to_number(args.gmcp_args.gutwounds) >= 35) {
    affs.set('lightgutwounds',true);
    affs.set('heavygutwounds',true);
  } else {
    affs.clear('heavygutwounds');
    affs.clear('criticalgutwounds');
  }
  if (to_number(args.gmcp_args.gutwounds) >= 75) {
    affs.set('lightgutwounds',true);
    affs.set('heavygutwounds',true);
    affs.set('criticalgutwounds',true);
  } else {
    affs.clear('criticalgutwounds');
  }
  if (to_number(args.gmcp_args.leftarmwounds) > 0) {
    affs.set('lightleftarmwounds',true);
  } else {
    affs.clear('lightleftarmwounds');
    affs.clear('heavyleftarmwounds');
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(args.gmcp_args.leftarmwounds) >= 35) {
    affs.set('lightleftarmwounds',true);
    affs.set('heavyleftarmwounds',true);
  } else {
    affs.clear('heavyleftarmwounds');
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(args.gmcp_args.leftarmwounds) >= 75) {
    affs.set('lightleftarmwounds',true);
    affs.set('heavyleftarmwounds',true);
    affs.set('criticalleftarmwounds',true);
  } else {
    affs.clear('criticalleftarmwounds');
  }
  if (to_number(args.gmcp_args.rightarmwounds) > 0) {
    affs.set('lightrightarmwounds',true);
  } else {
    affs.clear('lightrightarmwounds');
    affs.clear('heavyrightarmwounds');
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(args.gmcp_args.rightarmwounds) >= 35) {
    affs.set('lightrightarmwounds',true);
    affs.set('heavyrightarmwounds',true);
  } else {
    affs.clear('heavyrightarmwounds');
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(args.gmcp_args.rightarmwounds) >= 75) {
    affs.set('lightrightarmwounds',true);
    affs.set('heavyrightarmwounds',true);
    affs.set('criticalrightarmwounds',true);
  } else {
    affs.clear('criticalrightarmwounds');
  }
  if (to_number(args.gmcp_args.leftlegwounds) > 0) {
    affs.set('lightleftlegwounds',true);
  } else {
    affs.clear('lightleftlegwounds');
    affs.clear('heavyleftlegwounds');
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(args.gmcp_args.leftlegwounds) >= 35) {
    affs.set('lightleftlegwounds',true);
    affs.set('heavyleftlegwounds',true);
  } else {
    affs.clear('heavyleftlegwounds');
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(args.gmcp_args.leftlegwounds) >= 75) {
    affs.set('lightleftlegwounds',true);
    affs.set('heavyleftlegwounds',true);
    affs.set('criticalleftlegwounds',true);
  } else {
    affs.clear('criticalleftlegwounds');
  }
  if (to_number(args.gmcp_args.rightlegwounds) > 0) {
    affs.set('lightrightlegwounds',true);
  } else {
    affs.clear('lightrightlegwounds');
    affs.clear('heavyrightlegwounds');
    affs.clear('criticalrightlegwounds');
  }
  if (to_number(args.gmcp_args.rightlegwounds) >= 35) {
    affs.set('lightrightlegwounds',true);
    affs.set('heavyrightlegwounds',true);
  } else {
    affs.clear('heavyrightlegwounds');
    affs.clear('criticalrightlegwounds');
  }
  if (to_number(args.gmcp_args.rightlegwounds) >= 75) {
    affs.set('lightrightlegwounds',true);
    affs.set('heavyrightlegwounds',true);
    affs.set('criticalrightlegwounds',true);
  } else {
    affs.clear('criticalrightlegwounds');
  }
}