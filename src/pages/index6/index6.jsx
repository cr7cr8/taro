import React, { useCallback, useRef, useEffect, useContext, useState } from "react";
import Taro, { useDidHide, useDidShow } from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, Map, Editor, Camera } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast, } from "taro-hooks";



import AppContext from "../../context/AppContext";

import { AtButton, AtSlider, AtCalendar } from "taro-ui";



export default function Index6() {

    //   const [cameraContext] = useState(Taro.createCameraContext())

    const cameraContext = useRef()

    useEffect(function () {
        cameraContext.current = Taro.createCameraContext()
        const listener = cameraContext.current.onCameraFrame(function (info) {
            // console.log(info.data)
        })
        listener.start({
            complete: (res) => {
                console.log("staring listenning camera", res)
            }
        })


    }, [])

    useDidShow(() => {  console.log('componentDidShow')})


    useDidHide(() => {  console.log('componentDidHide')})



    //  const [picArr, setPicArr] = useState([])
    return (
        <>
            <Text>Index6</Text>
            <Camera style={{ width: "100%", height: "100PX" }} mode="normal" onInitDone={function (e) { console.log("模拟器里无法用", e) }}></Camera>
            <Button
                onClick={function () {

                    // 模拟器里无法用
                    cameraContext.current.setZoom({
                        zoom: 1.5,
                        complete: (res) => { console.log("-----", res) },
                    })
                    ///////////////////




                    cameraContext.current.startRecord({
                        //   success: (res) => { console.log(res) },
                        complete: (res) => {
                            console.log("start recording", res)
                            // Taro.saveFile({ tempFilePath: res.tempImagePath }).then(path => {
                            //     console.log(path)
                            //     setPicArr(pre => ([...pre, path.savedFilePath]))

                            // })
                            //console.log(res)
                        },
                    })



                }}>
                Start Recording
            </Button>
            <Button onClick={function () {

                cameraContext.current.stopRecord({
                    //   success: (res) => { console.log(res) },
                    complete: (res) => {
                        console.log("recording done", res)
                        // Taro.saveFile({ tempFilePath: res.tempImagePath }).then(path => {
                        //     console.log(path)
                        //    // setPicArr(pre => ([...pre, path.savedFilePath]))

                        // })
                        //console.log(res)
                    },
                })

            }}>
                Stop Recording
            </Button>



            {/* {
                picArr.map((pic, index) => {
                    //  console.log(pic)
                    return <Image src={pic} />

                })
            } */}

        </>
    )

}