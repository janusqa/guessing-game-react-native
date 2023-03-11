import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

type Props = {
    children: React.ReactNode;
};

const NumberContainer: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    );
};

// Use the Dimension API to get information
// about device size ect.
// Below 'window' gets size of device excluding status bar
// while 'screen gets size od device including status bar
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24, // on small screens (450px and less) use a padding of 12 elese use a padding of 24
        borderRadius: 8,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold',
    },
});

export default NumberContainer;
