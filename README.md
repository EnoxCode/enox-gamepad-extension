In Development!

# Enox Gampepad extensions
This is a module for Foundry VTT that uses AngryBeavers GamePad module to enable additional options for Gamepads

- A replacement for TokenMovement, this one checks if in combat, and if the current Token is controlled. If not controlled it asks if you want to take over control. This is done to ensure sight is working correctly.
- A new module for Zoom In / Zoom Out of the canvas
- A new module that allows up to 4 macro's, any macro's can be used. As the new token movement ensures the controlled char is the current controller effects that target "token" always target the token controlled. 

## Macro Inspiration
- "End Turn" end the turn for the current player
- Pan canvas to current token
- Change Character if player controls more than 1 char
- Turn on Torch/Light/etc


# Roadmap
- [ ] Clean up code
- [ ] Proper type, typescript
- [ ] Allow for translation
- [ ] Allow for custom macro per gamepad