# README

No special configuration is needed to launch this project. 
```bash
npm install 
``` 
Start the dev server with 
```bash
ng serve
```
## known issues

- test coverage is very limited due to time constraints
- when displaying the error message on floating inputs, the placeholders layout is off
- there is a small unnecessary scroll on the whole chat page
- after sending a message in a room, there is no autoscroll to the end of the chat 
- translation is buggy in different parts of the project (dropdown of the account in the header, header and buttons of the dialogs, buttons in the profile interface, page titles)
- polling the backend for new messages every second is a performance issue. Should be replaced with websocket
