import { Component, createContext, useState } from "react";
import "./app.css";
import { View, Text, Button, Image } from "@tarojs/components";

import AppContext from "./context/AppContext"


import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
// class App extends Component {
//   componentDidMount() { }

//   componentDidShow() { }

//   componentDidHide() { }

//   componentDidCatchError() { }

//   // this.props.children 是将要会渲染的页面
//   render() {
//     return this.props.children;
//   }
// }


function App({ children, ...props }) {


//注：入口文件无法渲染 UI //https://taro-docs.jd.com/taro/docs/guide/#%E5%85%A5%E5%8F%A3%E7%BB%84%E4%BB%B6
  

  const [count,setCount] = useState(0)
  return (
     <AppContext.Provider value={{ count,setCount}}>
       {children}
       <Text>8888</Text>
     </AppContext.Provider>

  )

}


export default App;
