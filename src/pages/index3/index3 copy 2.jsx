import React, { useCallback, useEffect, useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Swiper, SwiperItem, Navigator, } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import AppContext from "../../context/AppContext";


export default function Index3() {

    // useEffect(function(){

    //     Taro.startRecord({

    //         success: function (res) {
    //           const tempFilePath = res.tempFilePath

    //             Taro.saveFile({
    //                 tempFilePath: tempFilePath,
    //                 complete:function(res){

    //                     console.log("save done",res)
    //                 }

    //             })


    //           Taro.playVoice({
    //             filePath: tempFilePath,
    //             complete: function () { console.log(tempFilePath)},
    //             success:function(res){
    //                 console.log(res)
    //             }
    //           })
    //         },

    //       })


    //       setTimeout(function () {
    //         Taro.stopRecord() // 结束录音
    //       }, 3000)


    // },[])

    useEffect(function () {
        Taro.setNavigationBarTitle({
            title: 'Index3 页面'
        })

        const recorderManager = Taro.getRecorderManager()

        recorderManager.start({
            duration: 3000
        })

        recorderManager.onStop(function (soundFile) {

            Taro.playVoice({
                filePath:  soundFile.tempFilePath,
                fail: function (res) {
                    console.log("playing failed")
                },
                complete: function (res) {
                    console.log(soundFile.tempFilePath)
                    console.log("cccccccccccc", res)
                }

            })


            //console.log(soundFile)

            // Taro.saveFile({
            //     tempFilePath: soundFile.tempFilePath,
            //     success: function (res) {
            //         const savedFilePath = res.savedFilePath
            //         console.log("file path is ", savedFilePath)
            //         console.log("playing")

            //         Taro.playVoice({
            //             filePath: savedFilePath,
            //             fail:function(res){
            //                 console.log("playing failed")
            //             },
            //             complete:function(res){
            //                 console.log("cccccccccccc",res)
            //             }

            //         })

            //     },
            //     fail: function (res) {

            //         console.log("save failed")
            //     }
            // })

        })

        return function () {
            recorderManager.stop()

        }


    }, [])


    return (

        <Text>index 3</Text>

    )
}