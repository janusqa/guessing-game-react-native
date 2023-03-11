import { StyleSheet, View, Text } from 'react-native';
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

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 36,
        fontFamily: 'open-sans-bold',
    },
});

export default NumberContainer;
