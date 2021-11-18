# mglk.tech as Mike's hub
the purpose of mglk.tech is to provide people with a personal perspective of the internet.
That person, is Mike.

It already shows you what i'm listening to on spotify, why can't it also show what I like on YouTube? or, maybe as a bookmark for helpful websites?
I already have a login process for me to administrate the page content, why is it so important to be collecting data from it for games I am no longer interested in?

mglk.tech should be a HUB to show the world everything that I find intersting on the computer (for now). 

Okay, so if that's the case, I must look at what kind of information I would be comfortable with people knowing, and how often I would like that information to update.

I need to look at what API's I can integrate, and what info those API's are going to be responsible for showing. 

I have also included a Decay Time for each information type, because it would be far too much data otherwise:

**(?) - uncertain necessity**

**[ ] - used to define an Array**

| Program/API    | [Info Types (Decay Time)]                                              |
| -------------- | ---------------------------------------------------------------------- |
| Spotify/LastFM | [Currently Playing], [My favourite Song (1 week)]                      |
| Discord        | [Guilds (manual)]                                                      |
| Steam          | [Currently Playing], [Most Played (2 weeks)], [Most Played (all time)] |
| YouTube        | [Recently Liked (1 week)], [Favourite Videos (3 months)]               |


[ Describe API EndPoints that are in use]

# **Spotify/LastFM** 
- I am using a LastFM API to call for what I am currently playing on Spotify

I can also use the LastFM API to call Top Track (or Obsession if it exists), Obsessions last for One Week, but Top track updates automatically as my Last.FM account is spotify connected.

# **Discord**
- I want to set featured guilds manually
- I want this to integrate this with the SteamAPI to show what games my featured guilds relate to
- I want to show my nickname in each guild
- I want to show selected tags in each guild.

# **Steam**
- to show Currently Playing on my home page

### **I want all of these details available to the guest user through the desktop, as a shortcut**