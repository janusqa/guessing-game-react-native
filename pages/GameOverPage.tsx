import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

type Props = {
    rounds: number;
    userNumber: number;
    onStartNewGame: () => void;
};

const GameOverPage: React.FC<Props> = ({
    rounds,
    userNumber,
    onStartNewGame,
}) => {
    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

    let imageSize = 300;

    if (deviceWidth < 380) {
        imageSize = 150;
    }

    if (deviceHeight < 400) {
        imageSize = 80;
    }

    const ImageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <ScrollView style={styles.page}>
            <View style={styles.pageContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, ImageStyle]}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/success.png')}
                    />
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed{' '}
                    <Text style={styles.highlight}>{rounds}</Text> rounds to
                    guess the number{' '}
                    <Text style={styles.highlight}>{userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame}>
                    Start New Game
                </PrimaryButton>
            </View>
        </ScrollView>
    );
};

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    pageContainer: {
        marginTop: 10,
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans-regular',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    },
});

export default GameOverPage;
