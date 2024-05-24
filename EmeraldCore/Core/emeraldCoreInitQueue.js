let emerald = client.emerald;

var queue = emerald.queue = {q:[],qf:[],repeat:false};

queue.add = (cmd, free = false) => {
  if (free) {
    emerald.debugmsg(`Action queued free - ${cmd}`);
    emerald.queue.qf.push(cmd);
  } else {
    emerald.debugmsg(`Action queued - ${cmd}`);
    emerald.queue.q.push(cmd);
  }
}

queue.run = () => {
  if (emerald.paused || !(emerald.queue.q.length > 0 || emerald.queue.qf.length > 0)) return;

  //Roadmap: beastbal and mounted status
  let cmds = [];
  if (emerald.bals.onbal) {
    if (emerald.queue.qf.length > 0) {
      while (emerald.queue.qf.length > 0) {
        cmds.push(emerald.queue.qf.shift());
      }
    }
    if (emerald.queue.q.length > 0 && !emerald.flags.get('tryqueue')) {
      cmds.push(emerald.queue.repeat ? emerald.queue.q[0] : emerald.queue.q.shift());
      emerald.flags.set('tryqueue',true,250);
    }
  }
  if (cmds.length > 0) send_command(cmds.join('|'));
}

queue.reset = () => {
  queue.q = [];
  queue.qf = [];
  queue.repeat = false;
  
}