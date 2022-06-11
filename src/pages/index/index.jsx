import React, { useCallback, useEffect, useContext, useState } from "react";
import { View, Text, Button, Image, Map } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import logo from "./hook.png";

import './index.css';
import Taro from "@tarojs/taro";

import { localNumaaa } from "../index2/localNum";
import AppContext from "../../context/AppContext";

import { AtButton,AtSlider  } from "taro-ui";
import "taro-ui/dist/style/components/slider.scss";

const Index = () => {

  //console.log(localNumaaa, AppContext)
  const { count, setCount } = useContext(AppContext)


  useEffect(function () {

    console.log(Taro.getCurrentInstance().router.params)

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
      <AtSlider step={1} value={50} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4' blockSize={24}></AtSlider>
      <AtButton onClick={function(){
        setCount(pre=>pre+1)
      }}>{count}</AtButton>
      <Map longitude={100} latitude={30} showScale={true} style={{ height: "200px" }} />

      <Button onClick={function () {
        setCount(pre => pre + 1)
      }}>{count}</Button>

      <Button onClick={function () {
        Taro.redirectTo({ url: "/pages/index2/index2" })
      }}>Go to index 2</Button>


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
