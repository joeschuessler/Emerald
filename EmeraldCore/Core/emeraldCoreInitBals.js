let emerald = client.emerald;
let bals = emerald.bals = {};

bals.set = (tag) => {
  bals[tag] = true;
};

bals.use = (tag) => {
  bals[tag] = false;
};
