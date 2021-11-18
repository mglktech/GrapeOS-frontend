# Site Plan

##### The purpose of this page is to document some kind of design schema for the website.
## The Welcome screen (/welcome)
will consist of two buttons, either to Login with Discord, or browse as guest.
When you browse as guest, a "Guest Session" will be created for you to use to try out the software. All information a guest creates within their session will last 24 hours, and be deleted thereafter. Authentication for use of this "guest profile" will be stored in the session data for guest user of the site.

My site needs to know what guilds you're in so it can give you *contextual* information related to the guild itself, and associate your account with a guild/server pair.

FiveM Servers will need to be linked with Discord Guilds by a site administrator, and contextual "Apps" will need to be approved for use with this guild/server pair respectively before the software can be used in conjunction with a specific FiveM Server.
Further references to the "Guild/Server Pair" will be abbreviated by the term **GSP**.

Upon login, the user will be given the option to choose which Discord Server they intend to connect with (or, the software could just select whichever FiveM server your discord ID connected to last, as the default)
This can be done using a Dropdown element for now.

GSPs will become available to the user provided they are a member of that Discord Guild. This will ensure that access to any specific profile will be governed by whether the user is a member of a specific guild, and access to these profiles can be revoked at any time upon leaving the guild, or being removed by guild moderators. This is an intended function to assist with site moderation and does not require any extra work from any guilds' respective moderators.

The user's Profile will contain unique desktops in association with their approved GSPs, with the apps available to them depicted by the profile/guild the user has selected in the previous step.
the user's "Desktop" can be described as their own web portal, used to interact with the site software and database. This could potentially be customised by the user, or have specific defaults set by the GSP, and possibly even by their tags/ownership status of the connected discord account in relation to the aforementioned discord server.

  *For example, if the discord account is in ownership of a specific Role within a Discord Server, they could be given access to further contextual software for that role.*

A user's profile should be able to be switched at any time using a dropdown button on the taskbar, and should not require any extra authentication.

Each Desktop will have access to the following contextual apps by default:
* **Server Info**
* **Player Browser**
* **Interactions**
* **Following**


#### Server Info
Displays server information from the FiveM API, including its capacity/player count, tags, discord server info and a "Connect" button.

#### Player Browser
This app will display all connected players in a table, and will enable the user to search for players under the following contexts:
* FiveM Name
* Discord Name
* Any listed ID (SteamID, FiveM ID, Discord ID etc)
* In-Game Server Session ID (usually the Number above the player's head in-game)

All search methods should be capable of showing any player in the database even when the player is not online on the FiveM Server, however if the player is online at the time.

Once a specific player has been selected, the user will be taken to that player's site-generated profile, whereby they will be able to obtain the following contextual information:
* the player's online status
* All of the player's known IDs
* the player's activity on that server (Calendar Format)
* the player's contextual Discord information (From the GSP)
* the player's FiveM Name
* a method to "Add Interaction" for that player
* a method to "Follow" that player.


#### Interactions
This app will list personal interactions with specific players, and allow the user to modify/delete interactions that they have posted.
Bear in mind, the only way to add interactions with a player(s) is using the Player Browser.

*Personally, I have a difficult time remembering all the characters I interact with online, so being able to keep a log of different "Interactions" that I have with different characters while I am in those servers would be helpful.*

The initial requirements would be as follows:

  * a Button somewhere on the user profile that allows me to "add interaction"
  * a way to rate the interaction, so I can decipher whether it was positive, neutral (default), or negative.
  * a space to be able to write about the interaction to describe what happened, and any outcomes of it.
  * a way to tag multiple users in the same interaction, so I can know who else took part
  * the ability to pick an approximate time and date of the interaction, or have it default to Now
  * a way to view recent interactions
  * a way to modify any existing interaction that has been published by me
  * a way to delete interactions from the system published by me.