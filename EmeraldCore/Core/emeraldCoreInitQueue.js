let emerald = client.emerald;

var queue = emerald.queue = {q:[],'f':[],'sub':[],'super':[],'id':[],repeat:false};

queue.add = (cmd, pool = false) => {
  if (pool) {
    emerald.debugmsg(`Action queued in pool ${pool} - ${cmd}`);
    queue[pool].push(cmd);
  } else {
    emerald.debugmsg(`Action queued - ${cmd}`);
    queue.q.push(cmd);
  }
}

queue.run = () => {
  if (emerald.paused || !(queue.q.length > 0 || queue.f.length > 0 || queue.sub.length > 0 || queue.super.length > 0 || queue.id.length > 0)) return;
  if (emerald.plugins.affs && emerald.affs.has('aeon')) return;
  //Roadmap: beastbal and mounted status
  let cmds = [];
  if (emerald.bals.onbal) {
    /*while (queue.f.length > 0) {
      cmds.push(queue.f.shift());
    }*/
    if (queue.sub.length > 0 && !emerald.flags.get('trypsisub')) {
      cmds.push(`psi sub ${queue.sub.shift()}`);
      emerald.flags.set('trypsisub',true,250);
    }
    if (queue.super.length > 0 && !emerald.flags.get('trypsisuper')) {
      cmds.push(`psi super ${queue.super.shift()}`);
      emerald.flags.set('trypsisuper',true,250);
    }
    if (queue.id.length > 0 && !emerald.flags.get('trypsiid')) {
      cmds.push(`psi id ${queue.id.shift()}`);
      emerald.flags.set('trypsiid',true,250);
    }
    if (queue.q.length > 0 && !['trypsisub','tryosisuper','trypsiid','tryqueue'].some(f => emerald.flags.get(f))) {
      let curCmd = queue.q.shift();
      cmds.push(curCmd);
      if (queue.repeat) queue.q.push(curCmd);
      emerald.flags.set('tryqueue',true,250);
    }
    while (queue.f.length > 0) send_command(queue.f.shift());
    while (cmds.length > 0) send_command(cmds.shift());
  }
}

queue.reset = () => {
  queue.q = [];
  queue.f = [];
  queue.sub = [];
  queue.super = [];
  queue.id = [];
  queue.repeat = false;
  emerald.emnote('Action queues reset!');
}