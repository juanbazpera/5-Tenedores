import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Image} from 'react-native-elements'
import Carousel from 'react-native-banner-carousel'

const Banner = (props) => {
    const {arrayImages, height, width} = props;
    return (
        <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={width}
         pageIndicatorStyle={style.indicator} activePageIndicatorStyle={style.indicatorActive}>
             {arrayImages.map(urlImage => (
                 <View key={urlImage}> 
                    <Image style={{width, height}} source={{uri: urlImage}} />
                 </View>
             ))}
        </Carousel>
    )
}

const style = StyleSheet.create({
    indicator: {
        backgroundColor: "#00a680"
    },
    indicatorActive: {
        backgroundColor: "#00ffc5"
    }
})

export default Banner
