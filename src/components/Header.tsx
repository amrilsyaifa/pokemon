import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { white } from '../config/Color'
import { isEmpty } from '../config/IsEmpty';


interface Props {
    title: string;
    leftIcon?: string;
    rightTitle?: string;
    onPress?: () => void;
}

const Header: FC<Props> = ({title, leftIcon, rightTitle, onPress}) => {
    const leftIconData = !isEmpty(leftIcon) ? leftIcon : "chevron-left"
    return (
        <View style={[styles.container, {justifyContent:!isEmpty(rightTitle) ? 'space-between' : 'flex-start'}]}>
            <View style={styles.contTitle}>
                {!isEmpty(leftIcon) ? <TouchableOpacity onPress={onPress}><FontAwesome5 name={leftIconData} color={white} size={30} /></TouchableOpacity> : null}
                <Text style={styles.title}>{title}</Text>
            </View>
            {!isEmpty(rightTitle) ? <Text style={styles.titleID}>{rightTitle}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: Dimensions.get('screen').width,
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    contTitle: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    title: {
        fontSize: 20,
        color: white,
        marginLeft: 10
    },
    titleID: {
        fontSize: 16,
        color: white
    }
})


export default Header