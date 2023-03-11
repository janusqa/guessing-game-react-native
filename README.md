# Gradient Backgrounds
// this uses npm in background. this special command used so that expo can choose correct verison of this package for the expo version we have installed
$ npx expo install expo-linear-gradient  

# Fonts
// always show app splash or loading screen until fonts are initilized
$ npx expo install expo-splash-screen
$ npx expo install expo-font

# Orientation
in app.json 'orientation' is locked to 'portrait'. If you need to change orientation of your app by turning your phone ect, best to set this value to 'default'.  If you wish to lock it to 
landscape, then set its value to 'landscape'