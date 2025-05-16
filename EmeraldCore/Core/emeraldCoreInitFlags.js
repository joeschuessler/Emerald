let emerald = client.emerald;
let flags = emerald.flags = {};

flags.set = (name, val, ms) => {
  if (Object.prototype.hasOwnProperty.call(flags,name)) return;
  flags[name] = {'value': val, 'id': parseInt(setTimeout(() => {flags.clear(name)},ms))};
  emerald.debugmsg(`Flag ${flags[name].id} ${name} RAISED: ${val} for ${to_number(ms)/1000} seconds.`);
}

flags.get = (name) => {
  if (Object.prototype.hasOwnProperty.call(flags,name)) {
      emerald.debugmsg(`Flag ${name}: ${JSON.stringify(flags[name])}`)
      return flags[name].value;
  } else {
      return undefined;
  }
}

flags.clear = (name) => {
  if (Object.prototype.hasOwnProperty.call(flags,name)) {
    emerald.debugmsg(`Flag ${name} CLEARED!!`);
    clearTimeout(flags[name].id);
    delete flags[name];
  }
}