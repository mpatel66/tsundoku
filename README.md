# Tsundoku
Tsundoku is an app for searching and saving the books you'd like to read or have read. The app was built over five days as a Codeworks solo project.

As an avid book reader, I'm frustrated by the lack of a sleek, modern app where readers can keep track of their books. The current leading app hasn't been redesigned for a very long time (at least since 2010 when I first started using it). After doing a little research, I found that other readers were also experiencing pain points, and so I decided to try my hand at making my own book tracking app that put the UX and design first.


## Features

### View & Add the Latest Books

Users can browse the latest in fiction and non-fiction, select a specific book to view, and add it to their *Want To Read* list. 


<img src="./readMeAssets/AddBooks.gif" width="30%"/>


### View books added to your lists

Users can:

- view the books they're currently reading
- move books to the *Read* list and edit the read dates
- view book in the *Want To Read*, and edit the read status
- view books they've read in the past, and add a rating


<img src="./readMeAssets/ViewBooks.gif" width="30%"/>


### Search for books

Users can search for books by author, title, or both!


<img src="./readMeAssets/Search.gif" width="30%"/>


## Getting Started

- Fork the repository and clone it on your local machine
- Install the dependencies by running `npm i` in the client directory
- Start the client by running `npm start`
- If using Expo app on your phone, scan the QR code. Alternatively, you can open the app on an iPhone emulator. 


## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [React Navigation](https://reactnavigation.org/)
- [Google Books API](https://developers.google.com/books)
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
- [React Query](https://react-query.tanstack.com/)


## Insights

This was my first time building an app, and I learnt *a lot* about planning and executing such a project. Here are some of my learnings:


### Plan! Plan! Plan!

A few things I did that helped me focus:

- I had an MVP that was achievable
- I had some mockup designs of the app which I (mostly) stuck to
- I gave myself daily goals of which features I wanted to finish, and a personal deadline of when I'd stop coding new features. 

Something I could have done better:

- I should have planned the state management of the app prior to coding. I spent some time on the first day refactoring from prop-drilling to React Context/Dispatch.


### Read the GitHub Issues of Libaries you plan to use

A few of my bugs and setbacks came from one particular library, and I could have saved some time if I'd read the github issues, and planned a certain part of the app a little better


### The real world ain't perfect

-  I was frustrated and surprised by the lack of good, clean data on books
- If had to start all over again, with an inifnite amount of resources, I'd create my own books API, so that I could have control over the data.
- In the real world, however, it's not always possible to have such control, so I had to compromise on some feature, and let some dreams go.


### Coding at 8pm is a bad idea

- I think this one is self-explantory :smile:



![border](/Users/meera/Documents/Codeworks/Projects/Solo Project/tsundoku/client/assets/border.png)
