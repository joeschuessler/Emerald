let emerald = client.emerald;
let ship = emerald.ship = {
  name: 'EmeraldShip',
  version: '0.1.0',
};
set_variable('emerald_bash_version', ship.version);

ship.mode = 'steer';
ship.glidedirection = 'none';
ship.module = 'none';

ship.changeMode = () => {
  ship.mode = ship.mode == 'steer'
    ? 'glide'
    : 'steer';
}

emerald.plugins['ship'] = ship;