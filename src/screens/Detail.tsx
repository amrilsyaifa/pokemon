import React, { FC, useEffect, useState } from 'react'
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    Image, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    ToastAndroid, 
    RefreshControl,
    StatusBar } from 'react-native'
import axios from 'axios'
import Card from '../components/Card'
import Divider from '../components/Divider'
import Header from '../components/Header'
import { blue900, gray500, green, white } from '../config/Color'
import { isEmpty } from '../config/IsEmpty'
import Loading from '../components/Loading'


interface Props {
    navigation: any,
    route: any
}

const Detail:FC<Props> = ({route,navigation}) => {
    const { id, name } = route.params;

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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

    const fetchData = (isRefresh: boolean) => {
        if(isRefresh) {
            setRefreshing(true)
        }else {
            setIsLoading(true)
        }       
        axios({
            url: 'https://pokemon-fclzip.pahamify.com',
            method: 'post',
            data: {
                query: `
                    query {
                        pokemon(id: "${id}" name: "${name}" ){
                        id
                        number
                        image
                        name
                        types
                        classification
                        resistant
                        evolutions {
                            id
                            name
                            number
                            types
                            image
                        }
                        }
                    }
                `
            }
        })
        .then((result) => {           
            if(isRefresh) {
                setRefreshing(false)
            }else {
                setIsLoading(false)
            }    
            if (result.status === 200) {
                setData(result.data.data.pokemon)
            }
        })
        .catch(() => {
            if(isRefresh) {
                setRefreshing(false)
            }else {
                setIsLoading(false)
            }   
            ToastAndroid.show('Error fetch data', ToastAndroid.SHORT)
        })
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={green} barStyle="light-content" />
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={() => fetchData(true)} />
                }
            >
                <View style={[styles.container, {minHeight: window.height, width: window.width}]}>
                    <Header title="Detail" rightTitle={isLoading ? "" : `#${data.number}`} leftIcon="chevron-left" onPress={() => navigation.goBack() }/>
                    {isLoading ? <Loading isVisible={true}/> : 
                        <View style={[styles.content, {minHeight: window.height - 60, width: window.width}]}>
                            <View style={styles.imageContainer}>
                                {!isEmpty(data.image) ? <Image source={{uri:  data.image }} style={styles.images} resizeMode="stretch"/> : null}
                                <Text style={styles.titleImage}>Types</Text>
                                <Text style={styles.text}>{!isEmpty(data.types) ? data.types.join(', ') : ""}</Text>
                            </View>
                            <Divider />
                            <View style={styles.containerDescription}>
                                <Text style={styles.titleImage}>Classification</Text>
                                <Text style={styles.text}>{ !isEmpty(data.classification) ? data.classification : ""}</Text>
                            </View>
                            <Divider />
                            <View style={styles.containerDescription}>
                                <Text style={styles.titleImage}>Ressistant</Text>
                                <Text style={styles.text}>{!isEmpty(data.resistant) ? data.resistant.join(', ') : ""}</Text>
                            </View>
                            <Divider />
                            <View style={styles.containerDescription}>
                                <Text style={styles.titleImage}>Evolution</Text>
                                {!isEmpty(data.evolutions) ? 
                                    data.evolutions.map((val: any) => {
                                        console.log('isi val ', val)
                                        return (
                                            <Card key={val.id} data={val}/>
                                        )
                                    }) : null
                                }
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: green
    },
    content: {
        marginTop : 60,
        width: Dimensions.get('screen').width,
        minHeight: Dimensions.get('window').height- 60,
        backgroundColor: white,
        borderRadius: 10,
        padding: 15
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 20
    },
    images: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf:'center',
    },
    titleImage: {
        color: gray500,
        fontSize: 14,
        paddingVertical: 5
    },
    text: {
        color: blue900,
        fontSize: 14
    },
    containerDescription: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        marginTop: 25
    }
})


export default Detail