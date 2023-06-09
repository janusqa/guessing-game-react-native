import { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

type Props = {
    onPickNumber: (pickedNmber: number) => void;
};

const StartGamePage: React.FC<Props> = ({ onPickNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState<string>('');

    const { width, height } = useWindowDimensions();

    const numberInputHandler = (enteredText: string) => {
        setEnteredNumber(enteredText);
    };

    const resetInputHandler = () => {
        setEnteredNumber('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99.',
                [
                    {
                        text: 'Okay',
                        style: 'destructive',
                        onPress: resetInputHandler,
                    },
                ]
            );
        } else {
            onPickNumber(chosenNumber);
        }
    };

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.page}>
            <KeyboardAvoidingView style={styles.page} behavior="position">
                <View
                    style={[
                        styles.rooContainer,
                        { marginTop: marginTopDistance },
                    ]}
                >
                    <Title>Guess my Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

// we can use this as this is only executed once
// when that happens the dynamic values base on this are locked in on first run
// we need a feature that runs in a component. Enter useWindowDimentions from react-native
// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    rooContainer: {
        flex: 1,
        // marginTop: deviceHeight < 380 ? 30 : 100, // We will set this in component so it is recauculated on each refresh
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
});

export default StartGamePage;
