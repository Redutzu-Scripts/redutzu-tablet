RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'close' })
    cb('ok')
end)

RegisterCommand(Config.Command, function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'open' })
end, false)

RegisterKeyMapping(Config.Command, Config.CommandDescription, 'KEYBOARD', Config.OpenKey)
