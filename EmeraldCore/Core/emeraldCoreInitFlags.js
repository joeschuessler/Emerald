function FlagManager() {
  this.flags = {};
}
FlagManager.prototype.set = (name, value, timeout, callback) => {
  if (this.flags[name]) return;
  const timerHandle = timeout ? setTimeout(() => this.clear(name)) : null;
  const flag = {value, callback, timer: timerHandle};
  this.flags[name] = flag;
  emerald.debugmsg(`Flag ${flags[name].id} ${name} RAISED: ${val} for ${to_number(timeout)/1000} seconds.`);
}

FlagManager.prototype.get = (name) => {
  return this.flags[name] 
    ? this.flags[name].value
    : undefined;
}

FlagManager.prototype.clear = (name) => {
  if (!this.flags[name]) return;

  this.flags[name].timer && clearTimeout(this.flags[name].timer);
  this.flags[name].callback && this.flags[name].callback();

  delete this.flags[name];
}

client.emerald.flags ||= new FlagManager();