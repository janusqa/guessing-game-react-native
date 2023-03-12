// example of splitting platform specific code into their seperate files
// we give each file their platform name.
import { Platform } from 'react-native';

import Colors from './colors';

const PlatformSpecificColors = Platform.select({
    ios: () => require('./colors.ios').default,
    android: () => require('./colors.android').default,
})();

export default PlatformSpecificColors || Colors;
