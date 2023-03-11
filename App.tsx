import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGamePage from './pages/StartGamePage';
import GamePage from './pages/GamePage';
import { useState, useEffect, useCallback } from 'react';
import Colors from './constants/colors';
import GameOverPage from './pages/GameOverPage';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
    const [userNumber, setUserNumber] = useState<number | null | undefined>();
    const [gameOver, setGameOver] = useState<boolean>(true);
    const [rounds, setRounds] = useState<number>(0);
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) setAppIsReady(true);
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    const gameOverHandler = (gameOver: boolean, numRounds: number) => {
        setRounds(numRounds);
        setGameOver(gameOver);
    };

    const pickedNumberHandler = (pickedNumber: number) => {
        setUserNumber(pickedNumber);
        gameOverHandler(false, 0);
    };

    const startNewGameHandler = () => {
        setUserNumber(null);
        setRounds(0);
        setGameOver(true);
    };

    let page = <StartGamePage onPickNumber={pickedNumberHandler} />;

    if (userNumber)
        page = (
            <GamePage userNumber={userNumber} onGameOver={gameOverHandler} />
        );

    if (gameOver && userNumber)
        page = (
            <GameOverPage
                userNumber={userNumber}
                rounds={rounds}
                onStartNewGame={startNewGameHandler}
            />
        );

    return (
        <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.appContainer}
            onLayout={onLayoutRootView}
        >
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode="cover"
                style={styles.appContainer}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.appContainer}>{page}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});

export default App;
