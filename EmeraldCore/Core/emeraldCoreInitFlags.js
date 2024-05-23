let emerald = client.emerald;
let flags = client.emerald.flags = {};

flags.set = (name, val, timer, callback = undefined) => {
  if (callback == undefined) {
    emerald.flags[name] = {'value': val, 'id': parseInt(setTimeout(() => {emerald.flags.clear(name)},timer))}
  } else {
    emerald.flags[name] = {'value': val, 'id': parseInt(setTimeout(() => {emerald.flags.clear(name, true)},timer)), 'callback':callback};
  }
  emerald.debugmsg(`Flag ${emerald.flags[name].id} ${name} RAISED: ${val} for ${to_number(timer)/1000} seconds${callback ? ` with callback: ${callback}`:''}`);
}

flags.get = (name) => {
  if (emerald.flags.hasOwnProperty(name)) {
      emerald.debugmsg(`Flag ${name}: ${JSON.stringify(emerald.flags[name])}`)
      return emerald.flags[name].value;
  } else {
      return undefined;
  }
}

flags.clear = (name, exec = false) => {
  if (emerald.flags.hasOwnProperty(name)) {
    if (exec) {
      emerald.debugmsg(`Flag ${name} CLEARED with callback: ${emerald.flags[name].callback}`);
      eval(emerald.flags[name].callback)
    } else {
      emerald.debugmsg(`Flag ${name} CLEARED!!`);
    }
    clearTimeout(emerald.flags[name].id);
    delete emerald.flags[name];
  }
}