import React, { useCallback, useRef, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, Map, Editor, Camera } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";



import AppContext from "../../context/AppContext";

import { AtButton, AtSlider, AtCalendar } from "taro-ui";

export default function Index4() {




    const recorderManager = useRef(Taro.getRecorderManager())
    recorderManager.current.onStop(function (soundFile) {

        Taro.saveFile({ tempFilePath: soundFile.tempFilePath }).then(result => {
            console.log(result)

            setSoundArr(pre => {
                return [...pre, result.savedFilePath]
            })

        })
        // console.log(soundFile.tempFilePath)
    })

    const [soundArr, setSoundArr] = useState([])
    useEffect(function () {
        Taro.getSavedFileList().then(list => {
            setSoundArr(
                list.fileList.map(item => {
                    return item.filePath
                })
            )
        })
    }, [])



    return (
        <>
   
            <Text>index 4</Text>

            <Button onClick={function () {
                Taro.redirectTo({ url: "/pages/index/index" })
            }}>Go to index 1</Button>
            <Button onClick={function () {
                console.log(new Date())
            }}>
                Time
            </Button>
            <Button onClick={function () {
                Taro.getSavedFileList().then(list => {
                    console.log(list)
                })
            }}>
                getFileList
            </Button>

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
            {
                soundArr.map((item, index) => {
                    return <Button key={index}
                        onClick={function () {



                            console.log("pressed", index)

                            const innerAudioContext = Taro.createInnerAudioContext()
                            innerAudioContext.autoplay = true

                            innerAudioContext.src = item


                            // innerAudioContext.onPlay(() => {
                            //     console.log('开始播放',item)
                            // })
                            innerAudioContext.onEnded(() => {
                                innerAudioContext.destroy()
                            })

                            innerAudioContext.onStop(() => {
                                innerAudioContext.destroy()
                            })

                            innerAudioContext.onError((res) => {
                                innerAudioContext.destroy()
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


                        }}>
                        播放{item}
                    </Button>

                })
            }

        </>
    )
}