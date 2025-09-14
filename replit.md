# Discord Music Bot

**Overview:** An Advanced Discord Music Bot that supports multiple music platforms including YouTube, SoundCloud, Spotify, Apple Music, Deezer, and over 700 additional websites through yt-dlp integration.

**Current State:** Fully operational Discord Music Bot optimized for Replit environment. All voice connection issues resolved and production-ready with comprehensive audio optimizations.

## Recent Changes (September 14, 2025)
- **RESOLVED:** Voice connection timeout error (30 seconds) completely fixed
- **UPGRADED:** Node.js to v22.17.0 for @discordjs/voice compatibility and DAVE protocol support
- **UPGRADED:** @discordjs/voice to v0.19.0, discord.js to v14.22.1, DisTube to v5.0.7
- **OPTIMIZED:** Audio system - Removed @discordjs/opus, forced opusscript v0.0.8 usage for Replit compatibility
- **ENHANCED:** Runtime voice encoder verification with fail-fast detection
- **IMPLEMENTED:** Comprehensive voice connection diagnostics with timeout monitoring
- **ADDED:** @snazzah/davey dependency for Discord DAVE protocol support
- **CONFIGURED:** Production deployment settings for VM with proper run command
- **VERIFIED:** All 24 slash commands registered and functional

## Previous Changes (September 12, 2025)
- Imported from GitHub repository (iTzArshia/Discord-Music-Bot v2.2.1)
- Configured environment variable support for Discord credentials
- Set up proper workflow for console-based Discord bot
- Registered 24 slash commands successfully
- Bot is online and ready for music playback
- **FIXED:** Updated ready event to clientReady for Discord.js v14+ compatibility
- **FIXED:** Moved YtDlpPlugin to last position in plugin array
- **IMPROVED:** Dynamic ffmpeg path resolution for better Replit compatibility
- **COMPLETED:** Full Spanish translation of message commands (!commands)
- **FIXED:** Help command category mismatch with Spanish translations
- **RESOLVED:** Alias conflicts and improved Spanish command aliases
- **IMPLEMENTED:** Portable FFmpeg solution for cross-platform compatibility
- **SECURED:** Server restriction system - bot only works in authorized servers
- **ENHANCED:** Multi-platform FFmpeg detection with environment variable configuration

## Project Architecture
- **Language:** Node.js 22.17.0 with Discord.js v14.22.1 and DisTube v5.0.7
- **Main Files:** 
  - `index.js` - Main bot entry point
  - `register.js` - Slash command registration
  - `distube.js` - Music system configuration with optimized plugin order
  - `config.json` - Configuration settings
- **Commands:** Located in `commands/` directory with both slash commands and message commands
- **Events:** Discord and DisTube event handlers in `events/` directory

## Key Features
- Multi-platform music streaming (YouTube, Spotify, SoundCloud, etc.)
- Slash command and message command support
- Queue management, shuffle, loop, and audio filters
- AutoPlay functionality
- Voice channel management
- Robust audio encoding with fallback options

## Environment Setup
- Uses `DISCORD_BOT_TOKEN` and `DISCORD_CLIENT_ID` from Replit Secrets
- Falls back to config.json values if environment variables not set
- Dependencies installed with workaround for native modules using opusscript
- Dynamic ffmpeg path resolution (ffmpeg-static → system ffmpeg)
- Build tools installed (gcc, make, pkg-config) for potential native compilation

## Production Notes
- **Audio Optimization:** Uses opusscript v0.0.8 exclusively for maximum Replit compatibility
- **Voice Connection:** Comprehensive diagnostics with timeout monitoring and state logging
- **DAVE Protocol:** Full support with @snazzah/davey for modern Discord voice features
- **Plugin Order:** YtDlpPlugin positioned last for optimal functionality
- **Deployment:** VM configuration with "node index.js" command for production-ready operation
- **Runtime Verification:** Fail-fast voice encoder detection prevents silent audio failures

## Security & Access Control
- **Server Restrictions**: Bot only operates in authorized servers (IDs: 1405727340335468665, 1393290240214438021)
- **Auto-leave System**: Automatically exits unauthorized servers with notification
- **Command Validation**: All commands and interactions blocked in unauthorized servers

## Cross-Platform Compatibility
- **Portable FFmpeg Solution**: Robust multi-strategy FFmpeg detection for any hosting platform
- **Environment Variable Configuration**: Sets FFMPEG_PATH for maximum compatibility
- **Multiple Detection Methods**: System paths, ffmpeg-static, common locations, and PATH scanning

## Running the Bot
The bot runs automatically via the "Discord Music Bot" workflow. Bot status shows "Elite Music#8581 está en línea y listo para reproducir música para ti!" when connected successfully.

## Troubleshooting & Fixes Applied
- **✅ Voice Connection Timeout (30s):** Resolved by forcing opusscript usage and implementing connection diagnostics
- **✅ DAVE Protocol Errors:** Fixed by upgrading to Node.js 22 and installing @snazzah/davey
- **✅ Slash Command Registration:** All 24 commands properly registered and functional
- **✅ Audio Compatibility:** Removed @discordjs/opus conflicts, uses opusscript exclusively for Replit
- **✅ Runtime Stability:** Comprehensive error handling and voice connection monitoring active