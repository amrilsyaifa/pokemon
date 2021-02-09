import React, { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { gray300, green, blue100, blue900, purple, purple100, yellow } from '../config/Color'
import Chip from './Chip'

interface Props {
    data: any;
}

const Card:FC<Props> = ({data}) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: data.image}} style={styles.images} resizeMode={'stretch'}/>
            <View style={styles.contDescription}>
            <Text style={styles.title}>{data.number} - {data.name}</Text>
                <View style={styles.containerChip}>
                    {data.types.map((value: string, idx: number) => {
                        let color = value.toLocaleLowerCase() === "gross" ? green : 
                                    value.toLocaleLowerCase() === "fire" ? yellow : 
                                    value.toLocaleLowerCase() === "poison" ? purple : 
                                    value.toLocaleLowerCase() === "flying" ? purple100 : blue100
                        return <Chip key={idx} title={value} containerTitle={{ fontSize: 8 }} containerStyles={{ backgroundColor: color }} />
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        minHeight: 96,
        width: "100%",
        backgroundColor: gray300,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent:'flex-start',
        padding: 10,
        marginVertical: 10
    },
    images: {
        width: 72,
        height: 72,
        borderRadius: 72,
    },
    contDescription: {
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft: 15
    },
    title:{
        color: blue900,
        fontSize: 14,
        paddingVertical: 10
    },
    containerChip: {
        flexDirection:'row',
        justifyContent:'flex-start'
    },
})

export default Card