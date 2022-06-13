import React, { useCallback, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
//import logo from "./hook.png";
import './index2.css'
import AppContext from "../../context/AppContext";




export default function Index2() {

    const { count, setCount } = useContext(AppContext)

    const [location, setLocation] = useState("")

    Taro.setNavigationBarTitle({
        title: '当前Index2'
    })
    useEffect(function () {


        // Taro.scanCode({
        //     success: (res) => {
        //         console.log(res)
        //     }
        // })

        setTimeout(() => {
            Taro.createSelectorQuery().select(".vvv").fields({
                computedStyle: ['margin', 'backgroundColor', "height"]
            }, (res) => {
                console.log(res);
            }).exec()
        }, 0);


    }, [])

    const arr = ["a", "b", "c"]

    useEffect(function () {

        Taro.getLocation({
            type: 'wgs84',
            success: function (res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                console.log("your location is ", res)
                setLocation(res.latitude + " " + res.longitude)
            },
            fail: function (res) {
                console.log("location error message", res)
            }
        })

    }, [])


    return (
        <>

            <Compo>{location}</Compo>
            {arr.map((item_, index) => {
                const item = item_ + index
                return (
                    <View className="vvv" key={item}>{item}</View>
                )

            })}

            <Button className="btn" style={{ width: "20%" }} onClick={function () { setCount(pre => pre + 1) }}>{count}</Button>
            <Button onClick={function () {

                Taro.redirectTo({
                    url: '/pages/index/index?aabb=opopop',
                    // events: {
                    //     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    //     acceptDataFromOpenedPage: function (data) {
                    //         console.log(data)
                    //     },
                    //     someEvent: function (data) {
                    //         console.log(data)
                    //     }

                    // },
                    // success: function (res) {
                    //     // 通过eventChannel向被打开页面传送数据
                    //     res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
                    // }
                })
            }}>Go Index 1</Button>
            {/* <Swiper
                className='test-h'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                vertical
                circular
                indicatorDots
                autoplay>
                <SwiperItem>
                    <View className='demo-text-1'>1</View>
                </SwiperItem>
                <SwiperItem>
                    <View className='demo-text-2'>2</View>
                </SwiperItem>
                <SwiperItem>
                    <View className='demo-text-3'>3</View>
                </SwiperItem>
            </Swiper> */}
        </>


    )

}

function Compo(props) {

    console.log(props.children)
    return <View>{props.children}</View>

}