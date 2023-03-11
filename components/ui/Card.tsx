import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/colors';

type Props = {
    children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => {
    return <View style={styles.cardContainer}>{children}</View>;
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // Drop Shadow
        elevation: 4, // Shadow - Android Only!
        shadowColor: 'black', // Shadow - Android & IOS!
        shadowOffset: { width: 0, height: 2 }, // Shadow - Android & IOS
        shadowRadius: 6, // Shadow - Android & IOS
        shadowOpacity: 0.25, // Shadow - Android & IOS
    },
});
export default Card;
