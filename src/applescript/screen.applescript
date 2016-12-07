-- Toggle Screen Resolution
run application "SwitchResX Daemon"
delay 3
tell application "SwitchResX Daemon"
    if state = "start" then
        set res to modes of display 1 whose (width = 1280 and height = 720 and definition = 2)
    else
        set res to modes of display 1 whose (width = 1440 and height = 900 and definition = 2)
    end if
    set current mode of display 1 to first item of res
end tell
