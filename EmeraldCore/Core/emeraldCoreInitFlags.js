let emerald = client.emerald;
let flags = client.emerald.flags = {};

flags.set = (name, val, timer, callback = undefined) => {
  flags[name] = {'value': val, 'id': parseInt(setTimeout(() => {flags.clear(name, callback !== undefined)},timer)), 'callback':callback};
  emerald.debugmsg(`Flag ${flags[name].id} ${name} RAISED: ${val} for ${to_number(timer)/1000} seconds${callback ? ` with callback: ${callback}`:''}`);
}

flags.get = (name) => {
  if (flags.hasOwnProperty(name)) {
      emerald.debugmsg(`Flag ${name}: ${JSON.stringify(flags[name])}`)
      return flags[name].value;
  } else {
      return undefined;
  }
}

flags.clear = (name, exec = false) => {
  if (flags.hasOwnProperty(name)) {
    if (exec) {
      emerald.debugmsg(`Flag ${name} CLEARED with callback: ${flags[name].callback}`);
      eval(flags[name].callback)
    } else {
      emerald.debugmsg(`Flag ${name} CLEARED!!`);
    }
    clearTimeout(flags[name].id);
    delete flags[name];
  }
}