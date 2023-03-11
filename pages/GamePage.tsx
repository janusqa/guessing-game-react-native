import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { useState } from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

type Props = {
    userNumber: number;
    onGameOver: (gameOver: boolean, numRounds: number) => void;
};

const GamePage: React.FC<Props> = ({ userNumber, onGameOver }) => {
    let minBoundaryRef = useRef<number>(1);
    let maxBoundaryRef = useRef<number>(100);

    const generateRandomBetween = (
        min: number,
        max: number,
        exclude: number
    ): number => {
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        } else {
            return rndNum;
        }
    };

    const [currentGuess, setCurrentGuess] = useState<number>(() =>
        generateRandomBetween(
            minBoundaryRef.current,
            maxBoundaryRef.current,
            userNumber
        )
    );
    const [guessRounds, setGuessRounds] = useState<number[]>(() => [
        currentGuess,
    ]);

    useEffect(
        function () {
            if (currentGuess === userNumber) {
                onGameOver(true, guessRounds.length);
            }
        },
        [currentGuess]
    );

    const nextGuessHandler = (direction: string) => {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' },
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundaryRef.current = currentGuess;
        } else {
            minBoundaryRef.current = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(
            minBoundaryRef.current,
            maxBoundaryRef.current,
            currentGuess
        );

        setCurrentGuess(newRndNumber);
        setGuessRounds((prevState) => [newRndNumber, ...prevState]);
    };

    return (
        <View style={styles.page}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.InstructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler('higher')}
                        >
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler('lower')}
                        >
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color="white"
                            />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRounds.length - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                    keyExtractor={(item) => item.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: 46,
        paddingHorizontal: 24,
        paddingBottom: 24,
        alignItems: 'center',
    },
    InstructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});

export default GamePage;
