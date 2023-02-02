
# CSkinz

This is an CounterStrike in-game trading web application that allows users to trade **mock** items with one another. The primary purpose of this project was to showcase my proficiency in frontend and backend development, as part of a Network-based Application Development course I completed.

Technology stack used: HTML, CSS, JavaScript, MongoDB

Supporting libraries: Express.js, Mongoose, Bcrypt, Morgan, Connect-flash


  

 
  

## Features with Sceenshots

#### Signup & Login

![signup](https://user-images.githubusercontent.com/73158584/216435443-c55114e3-92f1-4a23-ab0f-305dac7795eb.png)

- User can create their profile using the signup functionality or login if they already have an account. 

#### View profile | Prerequisite - User Login

This page will display all the items listed by the user as well as the offer details such as offers made by the user, offers recieved by the user and past offers with thier status.

![profile](https://user-images.githubusercontent.com/73158584/216437888-b7faa53a-24cf-47fd-9c80-b2b175645b74.png)

- Users can edit or delete any of their item listings 
- User can accept/reject any incoming offers
- Users can withdraw any offer they made

#### View all the trade item listings

This page will display all the items that have been listed including the current user. Items will be displayed sorted by thier category.

![tradeitems](https://user-images.githubusercontent.com/73158584/216440663-3b1181b8-85ac-4e31-9d5e-fd8d28768047.png)

- Users can click on "Click here" to view details about that item listing such as item availiblity , description, owner, listing, option to trade and option to add that item to their watch list.

![tradedetails](https://user-images.githubusercontent.com/73158584/216441752-ee724059-157d-4bac-b4b3-e54b645f0a0c.png)

#### Make an offer

- User select san item listed they want (This item cannot be one of thier own listings)
![offerstep1](https://user-images.githubusercontent.com/73158584/216445779-bcea9cf2-4334-40dc-8279-563137892892.png)

- User clicks on the trade button
![offerstep2](https://user-images.githubusercontent.com/73158584/216446219-23f3ca29-aa91-4fb2-849e-64cca5aebeb7.png)

- Users selects item from their available list they want to offer in return
![offerstep3](https://user-images.githubusercontent.com/73158584/216446433-eda9d671-8f97-49cd-bcff-7d5b66d1f982.png)

- View offer made
![offermade](https://user-images.githubusercontent.com/73158584/216447037-f8d261aa-23e2-40f9-8949-496361c06f99.png)

