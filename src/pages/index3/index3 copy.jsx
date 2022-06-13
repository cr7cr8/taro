import React, { useCallback, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import AppContext from "../../context/AppContext";


export default function Index3() {

    useEffect(function () {
        Taro.setNavigationBarTitle({
            title: 'Index3 页面'
        })

        const recorderManager = Taro.getRecorderManager()

        recorderManager.start({
            duration: 3000
        })

        recorderManager.onStop(function (soundFile) {
            c//onsole.log(soundFile)

            Taro.saveFile({
                tempFilePath: soundFile.tempFilePath,
                success: function (res) {
                    const savedFilePath = res.savedFilePath
                    console.log("file path is ", savedFilePath)
                    console.log("playing")

                    Taro.playVoice({
                        filePath: savedFilePath,
                        fail:function(res){
                            console.log("playing failed")
                        },
                        complete:function(res){
                            console.log("cccccccccccc",res)
                        }
                        
                    })

                },
                fail: function (res) {

                    console.log("save failed")
                }
            })

        })

        return function () {
            recorderManager.stop()

        }


    }, [])


    return (

        <Text>index 3</Text>

    )
}