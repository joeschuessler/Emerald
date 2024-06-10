function AffManager() {
  this.slushqueue = [];
  this.dustqueue = [];
  this.steamqueue = [];
}

AffManager.prototype.gain = (aff) => {
 this.affs[aff] = true;
}

AffManager.prototype.cure = (aff) => {
  delete this.affs[aff];
}