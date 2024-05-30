let emerald = client.emerald;
let bals = emerald.bals = {
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
  ef: true,
  onbal: true
};

bals.set = (tag) => {
  bals[tag] = true;
};

bals.use = (tag) => {
  bals[tag] = false;
};
