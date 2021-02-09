import React from 'react'
import { View, StyleSheet } from 'react-native'
import { gray100 } from '../config/Color'

function Divider() {
    return (
        <View style={styles.divider}/>
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 2,
        width: "100%",
        backgroundColor: gray100
    }
})

export default Divider