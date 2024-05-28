let emerald = client.emerald;

var queue = emerald.queue = {q:[],qf:[],repeat:false};

queue.add = (cmd, free = false) => {
  if (free) {
    emerald.debugmsg(`Action queued free - ${cmd}`);
    queue.qf.push(cmd);
  } else {
    emerald.debugmsg(`Action queued - ${cmd}`);
    queue.q.push(cmd);
  }
}

queue.run = () => {
  if (emerald.paused || !(queue.q.length > 0 || queue.qf.length > 0)) return;

  //Roadmap: beastbal and mounted status
  let cmds = [];
  if (emerald.bals.onbal) {
    if (queue.qf.length > 0) {
      while (queue.qf.length > 0) {
        cmds.push(queue.qf.shift());
      }
    }
    if (queue.q.length > 0 && !emerald.flags.get('tryqueue')) {
      curCmd = queue.q.shift();
      cmds.push(curCmd);
      if (queue.repeat) queue.q.push(curCmd);
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