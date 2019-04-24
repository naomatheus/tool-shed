
# Tool shed
## Find the tools you need....instantly

## GOALS 4-25-19 

MORNING
- Set up the complete TOOLS MODEL
- Test routes to all possible templates from the TOOLS MODEL
- Make the EJS partials

AFTERNOON
- Ask them what to do next 
- Get the scaffold of the User model up and sort of going 
- Decide how we think we wanna style it 
-- set up static files folder 

### User Stories
*//////////////////////////*

#### HOME PAGE
- User should be able to see information about the application on the homepage i.e. what it does, the general idea
- User can go directly to the Tools index to see listings of tools on the app 
- User be taken to the **Register Page** with username and password, and must register in order to add to the Tools index

#### REGISTER PAGE
- User can register and create a new profile by entering their username, password, and having a unique combination of the two

#### NEW TOOL CREATE PAGE
- User can create a new tool to be added to the index by entering the Type of tool, details about it, general availability, and location by zip code 
- Page offers some guidance about what to put in the description
- New tool gets added to the index of tools

#### TOOL INDEX PAGE 
- User can see a display of all tools created on the site by people who want to share/offer them
- Page displays truncated details of the tools
- User can click one of the listings and be taken to the detail's page of that

#### TOOL DETAILS PAGE (SHOW)
- User can see image of tool (based on the tool's category)
- Details page shows contact information for the User who posted
- Shows untruncated details about the listing
- Displays comments that other users have made on the tool 

#### LOGIN PAGE
- User login by entering their username and password
- Username and password are authenticated so someone cannot the same username or password as someone else 




##### Stretch goals
- NEW TOOL CREATE Page offers some explanation of the benefits of using the service, general considerations, etiquette, etc.
- TOOL INDEX limits the number of tools displayed and allows user to cycle to truncated pages
- User can see image of tool (uploaded by the user)