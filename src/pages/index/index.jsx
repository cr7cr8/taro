import React, { useCallback, useEffect, useContext, useState } from "react";
import { View, Text, Button, Image, Map } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast, } from "taro-hooks";
import logo from "./hook.png";

import './index.css';
import Taro, { usePageScroll, useReady } from "@tarojs/taro";

import { localNumaaa } from "../index2/localNum";
import AppContext from "../../context/AppContext";

import { AtButton, AtSlider, AtCalendar } from "taro-ui";
//import "taro-ui/dist/style/components/slider.scss";
import "taro-ui/dist/style/components/calendar.scss";
import { axios, PostData, FileData } from 'taro-axios'



const Index = () => {

  //console.log(localNumaaa, AppContext)
  const { count, setCount } = useContext(AppContext)
  // usePageScroll(function(e){
  //   console.log("page scroll",e)
  // })

  useReady(() => {
    console.log("ready")
  })

  useEffect(function () {

    console.log(Taro.getCurrentInstance().router.params)

    axios.get("https://jsonplaceholder.typicode.com/posts/1").then(response => {
      console.log(response.data)
    })


    const cameraContext = Taro.createCameraContext()
    cameraContext.startRecord({})

    // Taro.chooseImage({
    //   success (res) {
    //     const tempFilePaths = res.tempFilePaths
    //     Taro.uploadFile({
    //       url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         'user': 'test'
    //       },
    //       success (res){
    //         const data = res.data
    //         //do something
    //       }
    //     })
    //   }
    // })

  }, [])


  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "导航条抬头" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);



  return (
    <View className="wrapper">

      

      <AtCalendar />
      <AtSlider step={1} value={50} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4' blockSize={24}

        onChanging={function (value) {
          console.log(value)
        }}

      ></AtSlider>
      <AtButton onClick={function () {
        setCount(pre => pre + 1)
      }}>{count}</AtButton>
      <Map longitude={111.544} latitude={31.8683} scale={8} showScale={true} style={{ height: "200px" }} />

      <Button onClick={function () {
        setCount(pre => pre + 1)
      }}>{count}</Button>

      <Button onClick={function () {
        Taro.redirectTo({ url: "/pages/index2/index2" })
      }}>Go to index 2</Button>

      <Button onClick={function () {
        Taro.redirectTo({ url: "/pages/index4/index4" })
      }}>Go to index 4</Button>


      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks! !!
        并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label" onClick={function () { show({ title: "aaaaa", confirmText: "cccc", }) }}>运行99环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题ddddddssss
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>

    </View>
  );
};

export default Index;
