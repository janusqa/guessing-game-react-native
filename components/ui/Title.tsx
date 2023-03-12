import { Text, StyleSheet, Platform } from 'react-native';

type Props = {
    children: React.ReactNode;
};

const Title: React.FC<Props> = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS == 'ios' ? 0 : 2, // use Platform API to make platform specific tweaks. like removeing border just for ios
        borderWidth: Platform.select({ ios: 0, android: 2 }), // another way to use Platform API
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width: 300,
    },
});

export default Title;
