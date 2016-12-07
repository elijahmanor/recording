-- Toggle Autohide of the Menu Bar
tell application "System Preferences" to reveal pane "com.apple.preference.general"
delay 0.1
tell application "System Events" to tell process "System Preferences"
    tell checkbox "Automatically hide and show the menu bar" of window "General"
        if state = "start" then
            if value is 0 then click
        else
            if value is 1 then click
        end if
    end tell
end tell
delay 0.1
tell application "System Preferences" to quit
