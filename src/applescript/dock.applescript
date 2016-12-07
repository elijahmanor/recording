-- Toggle Autohide of the Dock
if state = "start" then
    tell application "System Events" to set the autohide of the dock preferences to true
else
    tell application "System Events" to tell dock preferences to set autohide to false
end if
