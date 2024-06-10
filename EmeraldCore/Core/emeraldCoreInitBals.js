function BalanceManager() {
  this.bals = {
    B: true,
    eq: true,
    la: true,
    ra: true,
    ll: true,
    rl: true,
    x: true,
    s: true,
    S: true,
    i: true,
    ef: true
  };
}
BalanceManager.prototype.set = (tag) => {
  bals[tag] = true;
};

BalanceManager.prototype.use = (tag) => {
  bals[tag] = false;
};

BalanceManager.prototype.canAct = () => {
  return Object.values({ef: true, ...this}).reduce((acc, bal) => {return acc && this.bals[bal]},!client.emerald.vitals.prone)}

client.emerald.bals ||= new BalanceManager();
