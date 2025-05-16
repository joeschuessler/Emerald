if (args.gmcp_method == "Char.Vitals") {

  var emerald = client.emerald

  emerald.vitals.awp = to_number(args.gmcp_args.awp);
  emerald.vitals.maxawp = to_number(args.gmcp_args.maxawp);
  if (args.gmcp_args.stance) emerald.vitals.stance = args.gmcp_args.stance
  for (const s of ["hp","mp","ego","pow","xp","essence","awp"]){
    //save prev
    emerald.vitals["prev"+s] = emerald.vitals[s];
    //set current
    emerald.vitals[s] = 0 || to_number(args.gmcp_args[s]);
    //calc diff
    emerald.vitals["diff"+s] = emerald.vitals[s] - emerald.vitals["prev"+s] || 0;
    //set max
    if (!(["essence","xp"].includes(s))) {
      emerald.vitals["max"+s] = to_number(args.gmcp_args["max"+s]);
    }
    //calc percent
    emerald.vitals["pct"+s] = emerald.vitals[s]/emerald.vitals["max"+s]*100;
  }
  emerald.vitals.preveflow = emerald.vitals.eflow;
  emerald.vitals.eflow = to_number(args.gmcp_args.enigmaticflow);
  emerald.vitals.diffeflow = emerald.vitals.eflow - emerald.vitals.preveflow || 0;

  emerald.bals.B = to_number(args.gmcp_args.beastbal) == 1;
  emerald.bals.eq = to_number(args.gmcp_args.equilibrium) == 1;
  emerald.bals.la = to_number(args.gmcp_args.left_arm) == 1;
  emerald.bals.ra = to_number(args.gmcp_args.right_arm) == 1;
  emerald.bals.ll = to_number(args.gmcp_args.left_leg) == 1;
  emerald.bals.rl = to_number(args.gmcp_args.right_leg) == 1;
  emerald.bals.x = to_number(args.gmcp_args.balance) == 1;
  emerald.bals.s = to_number(args.gmcp_args.psisub);
  emerald.bals.S = to_number(args.gmcp_args.psisuper);
  emerald.bals.i = to_number(args.gmcp_args.psiid);
  emerald.bals.ef = to_number(args.gmcp_args.eflowbal) == 1;
  emerald.bals.onbal = emerald.bals.eq && emerald.bals.x && emerald.bals.la && emerald.bals.ra && emerald.bals.ll && emerald.bals.rl && emerald.bals.s != 0 && emerald.bals.S != 0 && emerald.bals.i != 0;
  if (emerald.plugins['Ship']) {
    let m = to_number(args.gmcp_args.modulebal);
    emerald.bals.aether = m == 1;
    emerald.ship.locked = m > -1;
  }
  for (const b of ["slush","ice","steam","dust","healing","sparkleberry","scroll","allheale"]) {
    emerald.bals[b] = to_number(args.gmcp_args[b]) == 1;
  }
  for (const v of ["blind","deaf","prone","kafe"]) {
    emerald.vitals[v] = to_number(args.gmcp_args[v]) == 1;
  }
  emerald.mounted = to_number(args.gmcp_args.mount) > 0;
}

if (args.gmcp_method == "Char.Skills.Groups") {
  let emerald = client.emerald;
  let coreSkills = ['aethercraft','arts','beastmastery','combat','discernment','discipline','dramatics','environment','influence','planar'];
  let toClear = [];
  emerald.debugmsg('Skills have changed! Updating lists.');
  let allVars = Object.keys(client.variables().vars);
  for (let v in allVars) {
    if (allVars[v].includes('emerald_skills_')) {
      let s = allVars[v].replace('emerald_skills_','');
      if (!coreSkills.includes(s)) toClear.push(s);
    }
  }
  while (toClear.length > 0) {
    delete_variable(`emerald_skills_${toClear.pop()}`);
  }
  run_function('emeraldCoreInitSkills','','EmeraldCore');
  for (let g in args.gmcp_args) {
    emerald.skills[args.gmcp_args[g].name] = [];
    send_GMCP('Char.Skills.Get', {group:args.gmcp_args[g].name});
  }
  if (emerald.configs.armBals == 'auto') emerald.showArmBals = false;
  if (emerald.configs.legBals == 'auto') emerald.showLegBals = false;
  if (emerald.configs.psiBals == 'auto') emerald.showPsiBals = false;
  emerald.showKataStance = false;
  emerald.showEflow = false;
}

if (args.gmcp_method == "Char.Skills.List") {
  let emerald = client.emerald;
  let skill = args.gmcp_args.group;
  if (['kata','knighthood'].includes(skill) && ['on','auto'].includes(emerald.configs.armBals)) emerald.showArmBals = true;
  if (skill == 'kata' && ['on','auto'].includes(emerald.configs.legBals)) emerald.showLegBals = true;
  if (skill == 'psionics' && ['on','auto'].includes(emerald.configs.psiBals)) emerald.showPsiBals = true;
  if (skill == 'kata') emerald.showKataStance = true;
  if (skill == 'zarakido') emerald.showEflow = true;
  emerald.skills[skill] = args.gmcp_args.list;
  set_variable(`emerald_skills_${skill}`,args.gmcp_args.list.join('|'));
}

if (args.gmcp_method == "Comm.Channel.Players") {
  let emerald = client.emerald;
  let people = args.gmcp_args;
  emerald.who = [];
  people.forEach(p => emerald.who.push(p.name));
}

  //TODO: aethercraft module

