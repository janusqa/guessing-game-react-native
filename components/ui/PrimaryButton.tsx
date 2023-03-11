import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../constants/colors';

type Props = {
    children: React.ReactNode;
    onPress: () => void;
};

const PrimaryButton: React.FC<Props> = ({ children, onPress }) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={(pressData) =>
                    pressData.pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer
                }
                onPress={onPress}
                android_ripple={{ color: Colors.primary600 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        // visual feedback via styles for pressed button needed for IOS
        opacity: 0.75,
    },
});

export default PrimaryButton;
