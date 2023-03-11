import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

type Props = {
    children: React.ReactNode;
    style?: { [key: string]: any };
};

const InstructionText: React.FC<Props> = ({ children, style }) => {
    return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily: 'open-sans-regular',
    },
});

export default InstructionText;
