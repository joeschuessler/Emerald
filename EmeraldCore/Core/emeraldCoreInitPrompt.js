let emerald = client.emerald
let prompt = emerald.prompt = {};

prompt.onPrompt = (gag = false) => {
  if (!gag && !emerald.flags.get('gagPrompt')) prompt.draw();
  if (!emerald.paused) {
    emerald.queue.run();
    emerald.plugins.bash && emerald.bash.try();
    if (emerald.skills.has('zarakido') && emerald.bals.ef && emerald.vitals.eflow <= 70 && !emerald.flags.get('tryingtea')) {
      emerald.debugmsg(emerald.skills.has('zarakido'));
      send_command('sip greentea harmonic');
      emerald.flags.set('tryingtea',true,500);
    }
  }
  if (emerald.flags.get('gagPrompt')) emerald.flags.clear('gagPrompt');
}

prompt.draw = () => {
  emerald.note.clear();
  emerald.note.build('[',emerald.configs.ui_white,'');
  emerald.note.build(emerald.vitals.hp,emerald.note.pctcolor(emerald.vitals.pcthp),'','h',emerald.configs.ui_white,'');
  emerald.note.build('|',emerald.configs.ui_white,'');
  emerald.note.build(emerald.vitals.mp,emerald.note.pctcolor(emerald.vitals.pctmp),'','m',emerald.configs.ui_white,'');
  emerald.note.build('|',emerald.configs.ui_white,'');
  emerald.note.build(emerald.vitals.ego,emerald.note.pctcolor(emerald.vitals.pctego),'','e',emerald.configs.ui_white,'');
  emerald.note.build('|',emerald.configs.ui_white,'');
  emerald.note.build(emerald.vitals.pow,emerald.note.pctcolor(emerald.vitals.pctpow),'','p',emerald.configs.ui_white,'');
  emerald.note.build('] ',emerald.configs.ui_white,'');
  if (emerald.skills.has('kata')) {
    emerald.note.build(' [',emerald.configs.ui_white,'')
    switch(emerald.vitals.stance) {
      case '[n]':
        emerald.note.build('N ',emerald.configs.ui_white,'')
        break;
      case '[b]':
        emerald.note.build('B',emerald.configs.ui_blue,'');
        break;
      case '[tl]':
        emerald.note.build('TL',emerald.configs.ui_green,'');
        break;
      case '[th]':
        emerald.note.build('TH',emerald.configs.ui_green,'');
        break;
      case '[c]':
        emerald.note.build('C',emerald.configs.ui_yellow,'');
        break;
      case '[sl]':
        emerald.note.build('SL',emerald.configs.ui_orange,'');
        break;
      case '[sh]':
        emerald.note.build('SH',emerald.configs.ui_orange,'');
        break;
      case '[k]':
        emerald.note.build('K',emerald.configs.ui_red,'');
        break;
    }
    emerald.note.build('] ',emerald.configs.ui_white,'');
  }
  if (emerald.skills.has('zarakido')) {
    emerald.note.build(emerald.vitals.eflow,emerald.note.pctcolor(emerald.vitals.eflow),'','ef ',emerald.configs.ui_white,'');
  }
  
  let pflags = '';
  emerald.bals.B ? pflags += 'B' : pflags += '-';
  emerald.bals.eq ? pflags += 'e' : pflags += '-';
  emerald.bals.x ? pflags += 'x' : pflags += '-';
  if (emerald.skills.has('blademaster') || emerald.skills.has('bonecrusher') || emerald.skills.has('kata')) emerald.bals.la ? pflags += 'l' : pflags += '-';
  if (emerald.skills.has('kata')) emerald.bals.ll ? pflags += 'L' : pflags += '-';
  if (emerald.skills.has('blademaster') || emerald.skills.has('bonecrusher') || emerald.skills.has('kata')) emerald.bals.ra ? pflags += 'r' : pflags += '-';
  if (emerald.skills.has('kata')) emerald.bals.rl ? pflags += 'R' : pflags += '-';
  if (emerald.vitals.kafe) pflags += 'k';
  if (emerald.vitals.deaf) pflags += 'd';
  if (emerald.vitals.blind) pflags += 'b';
  if (emerald.vitals.prone) pflags += 'p';
  if (emerald.cloaked) pflags += '<>'
  emerald.note.build(pflags+'- ',emerald.bals.onbal && emerald.affs.canAct() ? 'goldenrod' : 'grey','');
  prompt.drawTags();
  for (const d of ['hp','mp','ego','pow','xp','essence','awp','eflow']) {
    let diff = emerald.vitals['diff'+d]
    if (diff != 0) {
      if (diff > 0) {
        emerald.note.build(' [',emerald.configs.ui_white,'',`+${diff}${d=='pow'?'p':d=='essence'?'ess':d}`,emerald.configs.ui_green,'',']',emerald.configs.ui_white,'');
      } else {
        emerald.note.build(' [',emerald.configs.ui_white,'',`${diff}${d=='pow'?'p':d=='essence'?'ess':d}`,emerald.configs.ui_red,'',']',emerald.configs.ui_white,'');
      }
    }
  }
  emerald.note.display();
}



prompt.drawTags = () => {
  emerald.paused && emerald.note.build('[PAUSED]','silver','seagreen',' ','silver','');
  emerald.plugins.bash && emerald.bash.active && emerald.note.build('[BASHING]','blue','seagreen',' ',emerald.configs.ui_white,'');
  if (emerald.plugins.affs) {
    emerald.debugmsg('check aeon/stun/blackout');
    emerald.affs.has('aeon') && emerald.note.build('[AEON]','white','blue',' ',emerald.configs.ui_white,'');
    emerald.affs.has('stun') && emerald.note.build('[STUN]','black','yellow',' ',emerald.configs.ui_white,'');
    emerald.affs.has('blackout') && emerald.note.build('[BLACKOUT]','black','white',' ',emerald.configs.ui_white,'');
    
    emerald.affs.hasWounds() && emerald.note.build('[WS]:','white','red',' ',emerald.configs.ui_white,'');
    emerald.debugmsg('check hasHeadWounds');
    if (emerald.affs.hasHeadWounds()) {
      let str = 'HH';
      if (emerald.affs.has('damagedthroat')) str = '-HH-';
      else if (emerald.affs.has('damagedskull')) str = '>HH<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('head'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasChestWounds()) {
      let str = 'CC';
      if (emerald.affs.has('crushedchest')) str = '-CC-';
      else if (emerald.affs.has('collapsedlung')) str = '>CC<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('chest'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasGutWounds()) {
      let str = 'GG';
      if (emerald.affs.has('damagedorgans')) str = '-GG-';
      else if (emerald.affs.has('internalbleeding')) str = '>GG<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('chest'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasLeftArmWounds()) {
      let str = 'LA';
      if (emerald.affs.has('damagedleftarm')) str = '-LA-';
      else if (emerald.affs.has('mutilatedleftarm')) str = '>LA<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('leftarm'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasRightArmWounds()) {
      let str = 'RA';
      if (emerald.affs.has('damagedrightarm')) str = '-RA-';
      else if (emerald.affs.has('mutilatedrightarm')) str = '>RA<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('rightarm'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasLeftLegWounds()) {
      let str = 'LL';
      if (emerald.affs.has('damagedleftleg')) str = '-LL-';
      else if (emerald.affs.has('mutilatedleftleg')) str = '>LL<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('leftleg'),'',' ',emerald.configs.ui_white,'');
    }
    if (emerald.affs.hasRightLegWounds()) {
      let str = 'RL';
      if (emerald.affs.has('damagedrightleg')) str = '-RL-';
      else if (emerald.affs.has('mutilatedrightleg')) str = '>RL<';
      emerald.note.build(str,emerald.affs.checkWoundLevel('rightleg'),'',' ',emerald.configs.ui_white,'');
    }
  }
}