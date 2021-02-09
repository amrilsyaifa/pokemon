import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { white } from '../config/Color';

interface Props {
    isVisible: boolean;
}

const { width } = Dimensions.get('window');

const Loading: FC<Props> = ({isVisible}) => {
    return (
        <Modal style={{margin:0}}  isVisible={isVisible} backdropColor="rgba(0,0,0,0.5)" backdropOpacity={0.90}>
            <View style={styles.wrapper} >
                <View style={styles.loaderContainer}>
                    <View style={styles.loaderImage}>
                        <LottieView
                            style={styles.lottieImages}
                            source={require('../assets/lotties/loading.json')}
                            autoPlay
                            loop
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
	wrapper: {
		zIndex: 9,
		backgroundColor: 'rgba(0,0,0,0.6)',
		position: 'absolute',
		width: "100%",
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center'
	},
	loaderContainer: {
		width: width/3,
		height: width /3,
		backgroundColor: white,
		borderRadius: 15
	},
	loaderImage: {
		width: width /3,
		height: width /3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	lottieImages: {
		width: width/3,
		height: width/3
    },
});

export default Loading