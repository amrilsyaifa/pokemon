import React, { FC } from 'react'
import { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    FlatList, 
    RefreshControl, 
    ToastAndroid, 
    TouchableOpacity, 
    StatusBar,
    SafeAreaView } from 'react-native'
import { blue100, blue900, gray500, green, purple, purple100, red, white, white100, yellow } from '../config/Color'
import Header from '../components/Header'
import Chip from '../components/Chip'
import axios from 'axios'


interface Props {
    navigation: any
}


const Home:FC<Props> = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [listData, setListData] = useState([]);
    const [screenData, setScreenData] = useState(Dimensions.get('window'));

    const useScreenDimensions = () => {
        useEffect(() => {
          const onChange = (result: any) => {
            setScreenData(result.window);
          };
      
          Dimensions.addEventListener('change', onChange);
      
          return () => Dimensions.removeEventListener('change', onChange);
        });
      
        return {
          ...screenData,
          isLandscape: screenData.width > screenData.height,
        };
    };

    const window = useScreenDimensions();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        setRefreshing(true);
        axios({
            url: 'https://pokemon-fclzip.pahamify.com',
            method: 'post',
            data: {
                query: `
          query {
            pokemons(first: 200 ) {
              id
              number
              name
              image
                 types
              evolutions {
                id
                image
              }
            }
          }
            `
            }
        })
        .then((result) => {
            setRefreshing(false)
            if (result.status === 200) {
                setListData(result.data.data.pokemons)
            }
        })
        .catch(() => {
            ToastAndroid.show('Error fetch data', ToastAndroid.SHORT)
            setRefreshing(false)
        })
    }

    const onDetail = (data: any) => {
        navigation.navigate('Detail', {
            id: data.id,
            name: data.name,
        });
    }

    const renderItem = (data: any) => {
        let windowWidth = window.isLandscape ? window.height / 3 - 12 : window.width / 3 - 12
        return (
            <TouchableOpacity onPress={() => onDetail(data.item)} style={[styles.containerCardList, {width: windowWidth, height: windowWidth}]}>
                <Text style={styles.id}>{data.item.number}</Text>
                <Image source={{ uri: data.item.image }} style={styles.images} resizeMode="stretch"/>
                <Text style={styles.title}>{data.item.name}</Text>
                <View style={styles.containerChip}>
                    {data.item.types.map((value: string, idx: number) => {
                        let color = value.toLocaleLowerCase() === "gross" ? green : 
                                    value.toLocaleLowerCase() === "fire" ? yellow : 
                                    value.toLocaleLowerCase() === "poison" ? purple : 
                                    value.toLocaleLowerCase() === "flying" ? purple100 : blue100
                        return <Chip key={idx} title={value} containerTitle={{ fontSize: 8 }} containerStyles={{ backgroundColor: color }} />
                    })}
                </View>
            </TouchableOpacity>
        );
    }


    return (
        <SafeAreaView>
            <StatusBar backgroundColor={red} barStyle="light-content" />
            <View style={[styles.container, {minHeight: window.height, width: window.width}]}>
                <Header title="Ada Pokemon" />
                <View style={[styles.content, {minHeight: window.height - 60, width: window.width}]}>
                    <FlatList
                        key={window.isLandscape}
                        horizontal={false}
                        numColumns={window.isLandscape ? Math.floor(window.width / (window.height / 3 - 12)) : Math.floor(window.height / (window.width / 3 - 12)) }
                        data={listData}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
                        columnWrapperStyle={styles.row}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: red,
    },
    content: {
        marginTop: 60,
        backgroundColor: white100,
        borderRadius: 10,
        padding: 10
    },
    containerCardList: {
        borderRadius: 8,
        margin: 2,
        backgroundColor: white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5
    },
    id: {
        fontSize: 12,
        color: gray500,
        alignSelf: 'flex-start'
    },
    images: {
        width: 48,
        height: 48,
        borderRadius: 5,
    },
    title: {
        color: blue900,
        fontSize: 14
    },
    containerChip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        justifyContent: "flex-start"
    }
})


export default Home