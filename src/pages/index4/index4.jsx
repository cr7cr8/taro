import React, { useCallback, useRef, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, Map } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";



import AppContext from "../../context/AppContext";


export default function Index4() {




    const recorderManager = useRef(Taro.getRecorderManager())
    recorderManager.current.onStop(function (soundFile) {

        setSoundArr(pre => {
            return [...pre, soundFile.tempFilePath,]
        })
        console.log(soundFile.tempFilePath)

    })

    const [soundArr, setSoundArr] = useState([])
    return (
        <>

            <Text>index 4</Text>
            <Button
                onTouchStart={function () {
                    console.log(recorderManager.current)
                    recorderManager.current.start({
                        //duration: 3000
                    })
                }}
                onTouchEnd={function () {
                    recorderManager.current.stop()
                }}
            >录音</Button>
            {soundArr.map((item, index) => {
                return <Button key={index}
                    onClick={function () {


                        function pv() {
                            console.log("pressed", index)

                            const innerAudioContext = Taro.createInnerAudioContext()
                            innerAudioContext.autoplay = true

                            innerAudioContext.src = item

                            

                            innerAudioContext.onPlay(() => {
                                console.log('开始播放')
                            })
                            innerAudioContext.onEnded(() => {
                                innerAudioContext.destroy()
                            })

                            innerAudioContext.onError((res) => {
                                console.log(res.errMsg)
                                console.log(res.errCode)
                            })

                            // Taro.playVoice({
                            //     filePath: item,//soundFile.tempFilePath,

                            //     fail: function (res) {
                            //         console.log("playing failed")
                            //     },
                            //     complete: function (res) {

                            //         console.log("playing complete", item)
                            //     },
                            //     success: function (res) {
                            //         setTimeout(() => {
                            //             pv()
                            //         }, 0);
                            //     }
                            // })
                        }
                        pv()


                    }}>
                    播放{item}
                </Button>

            })}

        </>
    )
}