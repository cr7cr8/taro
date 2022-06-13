import React, { useCallback, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, Map } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import AppContext from "../../context/AppContext";


export default function Index3() {



    // useEffect(function () {
    //     Taro.setNavigationBarTitle({
    //         title: 'Index3 页面'
    //     })


    //     const recorderManager = Taro.getRecorderManager()

    //     recorderManager.start({
    //         duration: 3000
    //     })

    //     recorderManager.onStop(function (soundFile) {

    //         Taro.playVoice({
    //             filePath: soundFile.tempFilePath,
    //             fail: function (res) {
    //                 console.log("playing failed")
    //             },
    //             complete: function (res) {
    //                 console.log(soundFile.tempFilePath)
    //                 console.log("cccccccccccc", res)
    //             }

    //         })




    //     })

    //     return function () {
    //         recorderManager.stop()

    //     }


    // }, [])

    const [geoState, setGeoState] = useState()
    useEffect(function () {


        Taro.getLocation({
            type: 'wgs84',
            success: function (res) {
                const { latitude, longitude, speed, accuracy } = res
                setGeoState({ latitude, longitude })
            },
            fail: function (res) {
                console.log("location error message", res)
            }
        })

        Taro.onLocationChange(function (res) {
            console.log("location is ", res.latitude + " " + res.longitude)
        })

    }, [])


    return (
        <>
            <Map longitude={(geoState?.longitude) || 111.544} latitude={(geoState?.latitude) || 31.8683} scale={13} showScale={true} style={{ height: "200PX", width: "100%" }}




                onRegionChange={function (e) {
                    console.log("===", e?.detail?.centerLocation?.latitude, e?.detail?.centerLocation?.longitude)
                    if (e?.detail?.centerLocation?.latitude && e?.detail?.centerLocation?.longitude) {

                        setGeoState({ latitude: e?.detail?.centerLocation?.latitude, longitude: e?.detail?.centerLocation?.longitude })

                    }
                }}
            />
            <Text>index 3</Text>
            <Button onClick={function () {

                setGeoState({ longitude: 110, latitude: 31.8683 })
                // Taro.getLocation({
                //     type: 'wgs84',
                //     success: function (res) {
                //         const { latitude, longitude, speed, accuracy } = res
                //         setGeoState({ latitude, longitude })
                //     },
                //     fail: function (res) {
                //         console.log("location error message", res)
                //     }
                // })



            }}>getLocation</Button>
        </>
    )
}