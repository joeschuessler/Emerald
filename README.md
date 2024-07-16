# EmeraldCore
Nexus modules and javascript files for use in Lusternia
## Core commands
- `PAUSE|UNPAUSE` Pause Emerald from taking any actions
- `RESET` Reset Emerald to an on-load state. Certain portions of Emerald will retain memory when reset, but will not when Nexus is reloaded entirely.
- `DEBUG ON|OFF` Turns on debugging messages.
- `T <target>` Change your target. This value gets saved into the `target` variable.
- `A <target>` Change target and announce it. Where/how this gets announced must be set via `CFG`, see below.

## Configurations
Set via `CFG` commands.
- `CFG ANN[OUNCE] <action>` - Set your communication channel for announced targets, regroup calls, etc.
  - Ex: `CFG ANNOUNCE CLAN <clanname> TELL` will then use `CLAN <clanname> TELL <message>` for calls.
  - Ex: `CFG ANNOUNCE CLT3` will use `CLT3 <message>`
- `CFG BREW <brew>` - Configures which brew (tea/beer) to upkeep.
  - Ex: `CFG BREW GREENTEA`
  - Ex: `CFG BREW DARKMALT`
- `CFG BALS ARM|LEG|PSI ON|OFF|AUTO` - Configures prompt flags for limb/psionic balances. If set to `auto`, these will show only when relevant skills are active. `On` and `off` will force them to be displayed or hidden respectively.
- PLANNED: `CFG UI [RED|ORANGE|YELLOW|GREEN|BLUE|WHITE] <hex>` - Allow configuring the colors of the Emerald prompt/message colors.

## Action queues
Multiple actions can be queued up to execute when the appropriate capability to act is available.
- `Q[F|SUB|SUPER|ID] <action>` Queues actions, in order. Can be entered in a series by splitting with commas.
  - `Q` by itself is for actions that require and consume balance or equilibrium. If entered while on balance, it will begin executing immediately.
    - Ex: `Q INFLUENCE GNOME WITH BEGGING, INFLUENCE GNOME WITH BEGGING` - Will perform the begging influence action twice.
  - `QF` is for 'free' actions that require bal/eq, but do not consume it. These will fire in a burst on the next available balance, before actions that consume it.
    - Ex: `QF STANCE LEGS, INSOMNIA, RUB MERCY, THIRDEYE` - These four actions will all fire prior to the next action that consumes balance.
  - `QSUB`, `QSUPER` and `QID` apply to the three psionic channels. These allow you to queue up actions for each channel, which will fire in trios. Where a vanilla command would be `PSI SUB PSISENSE ON`, this can be queued with `QSUB PSISENSE ON`. `QSUPER` is for `PSI SUPER` and `QID` is for `PSI ID`.
    - This can be used with skills that lock psi channels. Channels that are fully locked will then be considered 'on balance,' but will not progress in their respective queues. Skills that lock a channel should be placed last in your list.
    - Ex: `QSUB REGENERATION, MINDFIELD ON, BLOODBOIL` 
      - BloodBoil will lock the sub channel in place, and thus is last in the order.

# Optional Modules
## EmeraldBash
- `CFG BASH ATTACK <command>` - Set your bashing attack. Use @ wildcard to refer to the target's name/noun, such as 'hog,' 'opossum,' 'centipede,' etcetera. Use # wildcard to use specific mob IDs for targeting.
  - Ex: `CFG BASH ATTACK POINT STAFF #` - Will result in bashing using a command such as `POINT STAFF 112920`.
  - Ex: `CFG BASH ATTACK SWING @` - Will result in using something like `SWING WEEVIL`.
- `CFG BASH RAZE [NONE|WAIT|RUNE|<attack>]` - Configures the attack you will use to raze targets' shields. Useful for monk Kata, or for warriors with Cleave. Use the same wildcards as `CFG BASH ATTACK`
  - `CFG BASH RAZE NONE|WAIT` - Identical in function; if your target has shielded, the Bash module will wait for them to act again and lower their guard.
  - `CFG BASH RAZE RUNE` - Tells Emerald to assume you have a Rune of Razing equipped, and will use your CFG'd attack regardless of shield.
  - `CFG BASH RAZE <attack>` - Configures your raze action, in the same manner as `CFG BASH ATTACK`
    - Ex: `CFG BASH RAZE CLEAVE #` - Uses warrior cleave, targets by mob ID.
    - Ex: `CFG BASH RAZE KATA PERFORM @ <raze form>` - Example of using a kata form developed specifically to include KA RAZE as one of your 3 form actions.
- `CFG BASH BEAST ON|OFF` - Configures using a beast trained in the Battle skill.
  - Note that Emerald currently is not built to use beasts exclusively for Raze attacks.