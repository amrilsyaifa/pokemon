import React, {FC} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../config/Color'

interface Props {
    title: string;
    containerStyles?: any;
    containerTitle?: any;
}

const Chip: FC<Props> = ({containerStyles, containerTitle, title}) => {
    return (
        <View style={[styles.chip, containerStyles]} >
            <Text style={[styles.titleChip, containerTitle]}>{title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    chip: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius:5,
        marginRight: 10
    },
    titleChip: {
        color: white,
        fontSize: 10
    }
})

export default Chip