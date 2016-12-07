# recording

Setup your computer environment into a recording mode

## Install

```
npm i recording -g
```

## Command Line Prompts

```
> recording
? Recording state (Use arrow keys)
❯ Start
  Stop
? Features to toggle (Press <space> to select, <a> to toggle all, <i> to inverse selection)
❯◯ Dock
 ◯ Menu Bar
 ◯ Notifications
 ◯ Screen Resolution
```

## Command Line Flags

```
> recording -h
  Usage: recording [options] <state>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -d, --dock           Dock
    -m, --menu           Menu Bar
    -n, --notifications  Notifications
    -s, --screen         Screen Resolution
```

### Example

Start recording and toggle the dock, menu, notifications, and screen

```
recording start -dmns
```
