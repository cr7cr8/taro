import React, { useCallback, useRef, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, Map, Editor, Camera } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";



import AppContext from "../../context/AppContext";

import { AtButton, AtSlider, AtCalendar } from "taro-ui";



export default function Index5() {



    const [picArr, setPicArr] = useState([])
    return (
        <>
            <Camera style={{ width: "100%", height: "100PX" }} mode="normal" onInitDone={function (e) { console.log("模拟器里无法用", e) }}></Camera>
            <Button
                onClick={function () {
                    const cameraContext = Taro.createCameraContext()

                    // 模拟器里无法用
                    cameraContext.setZoom({
                        zoom: 1.5,
                        complete: (res) => { console.log("-----", res) },
                    })
                    ///////////////////

                    // const listener = cameraContext.onCameraFrame(function (info) {
                    //     console.log(info.data)
                    // })
                    listener.start({
                        complete: (res) => {

                            console.log("staring listenning camera", res)
                        }
                    })


                    cameraContext.takePhoto({
                        //   success: (res) => { console.log(res) },
                        complete: (res) => {
                            Taro.saveFile({ tempFilePath: res.tempImagePath }).then(path => {
                                console.log(path)
                                setPicArr(pre => ([...pre, path.savedFilePath]))

                            })
                            //console.log(res)
                        },
                    })



                }}>
                Take Photo
            </Button>
            {
                picArr.map((pic, index) => {
                    //  console.log(pic)
                    return <Image src={pic} />

                })
            }

        </>
    )

}