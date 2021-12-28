## Ideas for the next year at mglk.tech

### Gaming API
I want to make several changes to the way Game information is collected, stored, and displayed on the site.
My site currently uses Steam Web API to collect my online status, as well as what game I am playing, however this is limited exlusively to Steam games. 
I like to play an entire array of games on many different luncher platforms for the PC, including games like Call Of Duty, which are not listed on Steam.
Call Of Duty uses the Blizzard Launcher on PC, which does not interact with steam.
Also, I have been known to play Minecraft, as well as Star Wars Battlefront, each of which also use their own lunchers (Xbox/Origin respectively)
It has become clear to me that using a specific games' launcher API is not the way forward, as these tent to vary widely in their operative use.

#### The Workaround
I have discovered that the Xbox app for Windows allows clients to display what they are currently playing inside of their *Prescence Text* in their Xbox Player Summary. This by itself is not a reliable data source, but it can be used in conjunction with *Prescence State* to improve it's accuracy.

My idea is to integrate the Internet Videogame Database (link) and use it as my primary source of game information, using the xbl.io API (link) to search for the game displayed in my Presence Text (dependant on prescence state). This process will require some way of verifying connections made between the search text and the actual game, but I can handle this with my Admin panel on the system backend, only displaying games of which the information for has been vetted by myself for display.

##### New Collection

```javascript
// Schematic for sv_game
new Schema(
	{
		xblio_presenceText: String, // Copied from users' xboxPlayerSummary
		igdb_search: [], // Initial Search information store
	},
	{
		timestamps: false,
	}
);
  ```
a Notification will pop up on the Admin Panel when documents exist within sv_games that do not have any igdb_search information.
igdb_search will be filled out upon the admin making a request (admin must be logged in to do this)
