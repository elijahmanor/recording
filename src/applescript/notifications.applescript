-- Toggle Do Not Disturb
tell application "System Events"
    tell application process "SystemUIServer"
        try
            key down option
            if state = "start" then
                click menu bar item "Notification Center" of menu bar 2
            else
                click menu bar item "Notification Center, Do Not Disturb enabled" of menu bar 2
            end if
            key up option
        on error
            key up option
        end try
    end tell
end tell
