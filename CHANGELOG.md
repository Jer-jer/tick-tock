# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.8] - 2024-12-12

### Minor changes

- Integrated Pexels API to search for images
- Readjusted timer to adjust text color based on image background
- Added a couple more fixes and improvements


## [0.0.7] - 2024-12-09

### Minor changes

- Added UpdateCountdownModal and UpdateMusicModal components
- Performed refactors on SCSS files
- Updated File and Folder structure to Feature-based
- Researched on Pexels, Lorem Picsum and Pixabay for free-to-use images and videos

## [0.0.6] - 2024-11-20

### Minor changes

- Reverted back the timer to using `setInterval` rather than `requestAnimationFrame` due to the following:
  - Discovered native/vanilla setInterval and `requestAnimationFrame` will still stop when tab is inactive due to browsers throttling them to preserve performance and efficiency leading the timers to be usynced to real-time or inaccurate
  - Discovered "Web Workers" and how they allow scripts being run on the background independently from any user interface scripts, Web Workers basically allows to bypass throttling (more information here: https://html.spec.whatwg.org/multipage/workers.html#introduction-14)
- Used worker-timers library to utilize the Web Workers for the timer
- Added feature that the tab shows the timer when inactive

## [0.0.5] - 2024-11-18

### Minor changes

- Added background music that can be played on the countdown via react-player
- Set the background music to loop
- Used the mute button to mute and unmute the background music
- Saved the background music in local storage so it plays on every page load
- Added a modal to update the background music
- Made the modal responsive
- Music is set on mute on the first load so it can autoplay, browsers have autoplay restrictions due to bad devs :< 

## [0.0.4] - 2024-11-18

### Patch changes

- Saved every new countdown in local storage
- Countdown in local storage is now being used on every page load
- local storage countdown is updated when the countdown is updated
- If the local storage is empty (ergo no countdown value) the countdown is set to now

### Minor changes

- Finished adding countdown with full functionality
- Adjusted mute button on the right spacing on screens that are 320px to 630px wide
- Added Update Countdown Timer modal
- Made Update Countdown Timer modal responsive

## [0.0.3] - 2024-11-17

### Minor changes

- Started adding a countdown with full functionality
- Fixed issue where chevron icon and the countdown timer seemingly not on the center

## [0.0.2] - 2024-11-17

### Minor changes

- Property centered the cheveron icon in the navbar and the timer in the center of the page
- Smoothed the animation of the millisecond timer by changing from `setInterval` to `requestAnimationFrame`
- Renamed component SCSS files from index.scss to style.scss

## [0.0.1] - 2024-11-13

### Minor changes

- Added a sound icon that enables and disables music (mute/unmute music)
- Fixed the issue where the navbar is not showing on width < 960 px

## [0.0.0] - 2024-09-15

### Major changes

- Added Prime React Library
- Added Prime Icons Library
- Added `getTimeRemaining` that checks the time remaining until the event
- Added a responsive navigation bar that has the ability to hide (only works on bigger screens < 960px )

## [0.0.0] - 2024-09-15

- Finally started working on the Event Countdown project!
- Added the navigation bar and the countdown timer.
